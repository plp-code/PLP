/**
 * Hardened proxy from /api/v1/* (same-origin, browser-facing) to the backend.
 * Route handlers in src/app/api/v1/[...path]/route.ts are thin wrappers.
 */

export const REQUEST_TIMEOUT_MS = 30_000; // tolerates backend cold starts
export const MAX_BODY_BYTES = 1024 * 1024; // 1 MB

const UNSAFE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "accept-language",
  "authorization",
  "content-type",
  "cookie",
  "user-agent",
];

const DROPPED_RESPONSE_HEADERS = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "server",
  "set-cookie",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "x-powered-by",
]);

class ConfigError extends Error {}

function jsonError(status: number, detail: string) {
  return Response.json({ detail }, { status });
}

function normalizeOrigin(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function getConfig(): { apiOrigin: string; siteOrigins: Set<string> } {
  const isProd = process.env.NODE_ENV === "production";

  const apiUrl = process.env.API_URL ?? (isProd ? "" : "http://127.0.0.1:8000");
  const apiOrigin = normalizeOrigin(apiUrl);
  if (!apiOrigin) throw new ConfigError("API_URL is missing or invalid");

  const siteUrls =
    process.env.SITE_URL ?? (isProd ? "" : "http://localhost:3000");
  const siteOrigins = new Set(
    siteUrls
      .split(",")
      .map((s) => normalizeOrigin(s.trim()))
      .filter((o): o is string => Boolean(o)),
  );
  if (siteOrigins.size === 0)
    throw new ConfigError("SITE_URL is missing or invalid");

  return { apiOrigin, siteOrigins };
}

export function buildUpstreamUrl(
  apiOrigin: string,
  path: string[],
  search: string,
): URL | null {
  if (path.length === 0) return null;
  for (const seg of path) {
    if (seg === "" || seg === "." || seg === ".." || /[/\\\0]/.test(seg)) {
      return null;
    }
  }
  const url = new URL(
    `${apiOrigin}/api/v1/${path.map(encodeURIComponent).join("/")}${search}`,
  );
  if (url.origin !== apiOrigin || !url.pathname.startsWith("/api/v1/"))
    return null;
  return url;
}

export function isSameSiteWrite(req: Request, siteOrigins: Set<string>) {
  const origin = req.headers.get("origin");
  if (origin) return siteOrigins.has(origin);
  return req.headers.get("sec-fetch-site") === "same-origin";
}

function trustedClientIp(req: Request): string | null {
  if (process.env.VERCEL !== "1") return null;
  const raw =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-vercel-forwarded-for") ??
    "";
  const ip = raw.split(",")[0].trim();
  return ip || null;
}

class BodyTooLargeError extends Error {}

async function readBodyLimited(req: Request): Promise<Uint8Array | undefined> {
  if (!req.body) return undefined;
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel().catch(() => {});
      throw new BodyTooLargeError();
    }
    chunks.push(value);
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.byteLength;
  }
  return out;
}

export async function proxyRequest(req: Request, path: string[]) {
  let config;
  try {
    config = getConfig();
  } catch (err) {
    console.error("[api-proxy] misconfigured:", (err as Error).message);
    return jsonError(500, "Server misconfigured");
  }

  const upstream = buildUpstreamUrl(
    config.apiOrigin,
    path,
    new URL(req.url).search,
  );
  if (!upstream) return jsonError(400, "Invalid path");

  const method = req.method.toUpperCase();
  const hasBody = method !== "GET" && method !== "HEAD";

  if (UNSAFE_METHODS.has(method) && !isSameSiteWrite(req, config.siteOrigins)) {
    return jsonError(403, "Cross-site request blocked");
  }

  let body: Uint8Array | undefined;
  if (hasBody) {
    const declared = Number(req.headers.get("content-length"));
    if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
      return jsonError(413, "Request body too large");
    }
    try {
      body = await readBodyLimited(req);
    } catch (err) {
      if (err instanceof BodyTooLargeError)
        return jsonError(413, "Request body too large");
      return jsonError(400, "Could not read request body");
    }
  }

  const headers = new Headers();
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = req.headers.get(name);
    if (value) headers.set(name, value);
  }
  const ip = trustedClientIp(req);
  if (ip) headers.set("x-forwarded-for", ip);

  let backendRes: Response;
  try {
    backendRes = await fetch(upstream, {
      method,
      headers,
      body: body as BodyInit | undefined,
      redirect: "manual",
      signal: AbortSignal.any([
        req.signal,
        AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      ]),
    });
  } catch (err) {
    const name = (err as Error)?.name;
    if (name === "TimeoutError") return jsonError(504, "Upstream timed out");
    if (name === "AbortError") return jsonError(499, "Client closed request");
    console.error("[api-proxy] upstream failure:", name);
    return jsonError(502, "Upstream unavailable");
  }

  const res = new Response(backendRes.body, {
    status: backendRes.status,
    statusText: backendRes.statusText,
  });
  backendRes.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (DROPPED_RESPONSE_HEADERS.has(k) || k.startsWith("access-control-"))
      return;
    res.headers.set(key, value);
  });
  for (const cookie of backendRes.headers.getSetCookie?.() ?? []) {
    res.headers.append("set-cookie", cookie);
  }
  return res;
}
