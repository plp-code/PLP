import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const accessToken = request.cookies.get("access_token");
    const refreshToken = request.cookies.get("refresh_token");

    if (!accessToken && !refreshToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnTo", `${pathname}${request.nextUrl.search}`);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};