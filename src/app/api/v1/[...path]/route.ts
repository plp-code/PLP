const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

async function proxyRequest(req: Request, path: string[]) {
  const url = new URL(req.url);
  const targetUrl = `${API_BASE_URL}/api/v1/${path.join("/")}${url.search}`;

  const forwardHeaders = new Headers(req.headers);
  forwardHeaders.delete("host");
  forwardHeaders.delete("content-length");
  forwardHeaders.delete("connection");

  const backendRes = await fetch(targetUrl, {
    method: req.method,
    headers: forwardHeaders,
    body: ["GET", "HEAD"].includes(req.method)
      ? undefined
      : await req.arrayBuffer(),
    // The backend is a JSON API and never issues 3xx; pass any through untouched.
    redirect: "manual",
    // @ts-expect-error - required for streaming request bodies in some runtimes
    duplex: "half",
  });

  const res = new Response(backendRes.body, {
    status: backendRes.status,
    statusText: backendRes.statusText,
  });

  backendRes.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (
      [
        "set-cookie",
        "content-encoding",
        "content-length",
        "transfer-encoding",
      ].includes(k)
    )
      return;
    res.headers.set(key, value);
  });

  const setCookies = backendRes.headers.getSetCookie?.() ?? [];
  setCookies.forEach((cookie) => res.headers.append("set-cookie", cookie));

  return res;
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(req: Request, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}
export async function POST(req: Request, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}
export async function PUT(req: Request, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}
export async function DELETE(req: Request, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}
export async function PATCH(req: Request, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}
