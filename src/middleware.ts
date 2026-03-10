import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const secret = process.env.JWT_SECRET;

  let isTokenValid = false;
  let role: string | null = null;

  if (token && secret) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(secret)
      );

      isTokenValid = true;
      role = payload.role as string;
    } catch (err) {
      isTokenValid = false;
    }
  }

  // ❌ Not logged in
  if (!isTokenValid) {
    if (pathname.startsWith("/partner-dashboard")) {
      return NextResponse.redirect(new URL("/partners", request.url));
    }

    if (pathname.startsWith("/member")) {
      return NextResponse.redirect(new URL("/membership-application", request.url));
    }
  }

  // ✅ Logged in but trying to access login pages
  if (isTokenValid && pathname === "/partner-login") {
    if (role === "partner") {
      return NextResponse.redirect(new URL("/partner-dashboard", request.url));
    }
  } 
  else if (isTokenValid && pathname === "/member") {
    if (role === "user") {
      return NextResponse.redirect(new URL("/member", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/partner-login",
    "/partner-dashboard/:path*",
    // "/member/:path*",
  ],
};