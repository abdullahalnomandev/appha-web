import { cookies } from "next/headers";

export async function serverFetch<T>(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies(); // ✅ must await now
  const token = cookieStore.get("token")?.value;

  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${process.env.API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // only send if exists
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`API Error: ${res.status}`);

  return res.json() as Promise<T>;
  
}



export const getImage = (path: string) => {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const baseUrl = process.env.API_URL?.replace(/\/api\/v1\/?$/, "") ?? "";

  return `${baseUrl}${path}`;
};

// type User = {
//   id: string;
//   name: string;
// };

// const users = await serverFetch<User[]>("/users");



// await serverFetch("/posts", {
//   method: "POST",
//   body: JSON.stringify({ title: "Hello" }),
// });
