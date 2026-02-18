import { NextRequest, NextResponse } from "next/server";
import { authKey } from "@/constants/storageKey";

export async function POST(req: NextRequest) {
  const { token, redirectTo } = await req.json();

  const res = NextResponse.redirect(redirectTo || "/");

  res.cookies.set({
    name: authKey,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
