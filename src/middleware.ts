import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const secret = process.env.JWT_SECRET;

  let isTokenValid = false;

  if (token && secret) {
    try {
      // Verify token using jose
      const decoded = await jwtVerify(token, new TextEncoder().encode(secret));
      console.log("Decoded token:", decoded.payload);
      isTokenValid = true;
    } catch (err) {
      console.log("JWT verification failed:", err);
      isTokenValid = false;
    }
  }

  // If NOT logged in or token invalid and accessing dashboard → redirect to login
  if (!isTokenValid && pathname.startsWith("/partner-dashboard")) {
    return NextResponse.redirect(new URL("/partner-login", request.url));
  }

  // If logged in and accessing login page → redirect to dashboard
  if (isTokenValid && pathname === "/partner-login") {
    return NextResponse.redirect(new URL("/partner-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/partner-login", "/partner-dashboard/:path*"],
};