import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // If logged in and trying to access login page
  if (token && pathname === "/partner-login") {
    return NextResponse.redirect(
      new URL("/partner-dashboard", request.url)
    );
  }

  // If NOT logged in and trying to access dashboard
  if (!token && pathname.startsWith("/partner-dashboard")) {
    return NextResponse.redirect(
      new URL("/partner-login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/partner-login", "/partner-dashboard/:path*"],
};
