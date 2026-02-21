"use server";

import { authKey } from "@/constants/storageKey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setAccessTokenToCookie = async (token: string, options: any) => {
  (await cookies()).set(authKey, token, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
  });

  if (options && options?.redirect) {
    redirect(options?.redirect);
  }
};


export const removeAccessTokenToCookie = async (options: any) => {
  (await cookies()).delete(authKey);

  if (options && options?.redirect) {
    redirect(options?.redirect);
  }

};