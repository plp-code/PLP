import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("auth_token");

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname.startsWith("/api/")) {
    const fastApiPath = pathname.replace("/api", "");

    const backendBaseUrl = process.env.FASTAPI_URL || "http://localhost:8000";

    const fastApiUrl = new URL(fastApiPath, backendBaseUrl);
    fastApiUrl.search = request.nextUrl.search;

    return NextResponse.rewrite(fastApiUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
