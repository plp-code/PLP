import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MAX_BODY_BYTES, proxyRequest } from "@/lib/apiProxy";

const SITE = "https://theprelovedprofessional.com";

function req(
  method: string,
  url = `${SITE}/api/v1/reviews/1`,
  init: { headers?: Record<string, string>; body?: BodyInit } = {},
) {
  return new Request(url, { method, ...init });
}

const sameSite = { origin: SITE };

describe("proxyRequest", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv("API_URL", "http://backend.test");
    vi.stubEnv("VERCEL", "1");
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValue(new Response('{"ok":true}', { status: 200 }));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it("strips spoofed forwarded headers and sets the trusted client IP", async () => {
    await proxyRequest(
      req("GET", undefined, {
        headers: {
          "x-forwarded-for": "6.6.6.6",
          "x-forwarded-host": "evil.test",
          forwarded: "for=6.6.6.6",
          "x-real-ip": "203.0.113.9",
          cookie: "access_token=abc",
        },
      }),
      ["reviews", "1"],
    );
    const sent = fetchMock.mock.calls[0][1].headers as Headers;
    expect(sent.get("x-forwarded-for")).toBe("203.0.113.9");
    expect(sent.get("x-forwarded-host")).toBeNull();
    expect(sent.get("forwarded")).toBeNull();
    expect(sent.get("cookie")).toBe("access_token=abc");
  });

  it("does not trust forwarded headers outside Vercel", async () => {
    vi.stubEnv("VERCEL", "");
    await proxyRequest(
      req("GET", undefined, {
        headers: { "x-forwarded-for": "6.6.6.6", "x-real-ip": "6.6.6.6" },
      }),
      ["reviews", "1"],
    );
    const sent = fetchMock.mock.calls[0][1].headers as Headers;
    expect(sent.get("x-forwarded-for")).toBeNull();
  });

  it.each([[[".."]], [["reviews", ".."]], [["a/b"]], [["a\\b"]], [[""]]])(
    "rejects unsafe path %j with 400",
    async (path) => {
      const res = await proxyRequest(req("GET"), path);
      expect(res.status).toBe(400);
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it("returns 502 when the backend is unreachable", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    const res = await proxyRequest(req("GET"), ["reviews", "1"]);
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ detail: "Upstream unavailable" });
  });

  it("returns 504 on timeout", async () => {
    fetchMock.mockRejectedValue(new DOMException("timed out", "TimeoutError"));
    const res = await proxyRequest(req("GET"), ["reviews", "1"]);
    expect(res.status).toBe(504);
  });

  it("returns 413 when content-length is over the cap", async () => {
    const res = await proxyRequest(
      req("POST", undefined, {
        headers: {
          ...sameSite,
          "content-length": String(MAX_BODY_BYTES + 1),
        },
        body: "x",
      }),
      ["reviews", "1"],
    );
    expect(res.status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 413 when the real body is over the cap (no/lying header)", async () => {
    const res = await proxyRequest(
      req("POST", undefined, {
        headers: sameSite,
        body: new Uint8Array(MAX_BODY_BYTES + 1),
      }),
      ["reviews", "1"],
    );
    expect(res.status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("blocks cross-origin writes with 403", async () => {
    const res = await proxyRequest(
      req("POST", undefined, {
        headers: { origin: "https://evil.test" },
        body: "{}",
      }),
      ["reviews", "1"],
    );
    expect(res.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("allows the www origin", async () => {
    const res = await proxyRequest(
      req("POST", undefined, {
        headers: { origin: "https://www.theprelovedprofessional.com" },
        body: "{}",
      }),
      ["reviews", "1"],
    );
    expect(res.status).toBe(200);
  });

  it("compares Origin to the fixed list, not the request's own URL/Host", async () => {
    const res = await proxyRequest(
      req("POST", "https://evil.test/api/v1/reviews/1", {
        headers: { origin: "https://evil.test", host: "evil.test" },
        body: "{}",
      }),
      ["reviews", "1"],
    );
    expect(res.status).toBe(403);
  });

  it("allows localhost only outside production", async () => {
    const local = () =>
      proxyRequest(
        req("POST", undefined, {
          headers: { origin: "http://localhost:3000" },
          body: "{}",
        }),
        ["reviews", "1"],
      );
    expect((await local()).status).toBe(200);
    vi.stubEnv("NODE_ENV", "production");
    expect((await local()).status).toBe(403);
  });

  it("blocks writes with neither Origin nor Sec-Fetch-Site", async () => {
    const res = await proxyRequest(req("DELETE"), ["reviews", "1"]);
    expect(res.status).toBe(403);
  });

  it("allows writes via Sec-Fetch-Site: same-origin when Origin is absent", async () => {
    const res = await proxyRequest(
      req("DELETE", undefined, {
        headers: { "sec-fetch-site": "same-origin" },
      }),
      ["reviews", "1"],
    );
    expect(res.status).toBe(200);
  });

  it("drops server/CORS headers from the response and keeps all cookies", async () => {
    const backend = new Response("{}", { status: 200 });
    backend.headers.set("server", "uvicorn");
    backend.headers.set("access-control-allow-origin", "*");
    backend.headers.append("set-cookie", "a=1; Path=/; HttpOnly");
    backend.headers.append("set-cookie", "b=2; Path=/; HttpOnly");
    fetchMock.mockResolvedValue(backend);
    const res = await proxyRequest(req("GET"), ["reviews", "1"]);
    expect(res.headers.get("server")).toBeNull();
    expect(res.headers.get("access-control-allow-origin")).toBeNull();
    expect(res.headers.getSetCookie()).toHaveLength(2);
  });

  it("fails closed when API_URL is missing in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("API_URL", "");
    const res = await proxyRequest(req("GET"), ["reviews", "1"]);
    expect(res.status).toBe(500);
  });
});
