import { proxyRequest } from "@/lib/apiProxy";

type RouteContext = { params: Promise<{ path: string[] }> };

async function handler(req: Request, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
