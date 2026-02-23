"use server";

import { authKey } from "@/constants/storageKey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function  removeAccessTokenToCookie(options?: { redirect?: string }) {
  const cookieStore = cookies(); // NO await here

  // Delete the cookie
  await (cookieStore as any).delete(authKey, { path: "/" }); // <-- use delete, not set

  // Optional redirect
  if (options?.redirect) {
    redirect(options?.redirect);
  }
}