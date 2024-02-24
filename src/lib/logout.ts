"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logOut() {
  "use server";
  const token = cookies().get("session");
  await fetch("http:/localhost:3000/api/auth", {
    method: "DELETE",
    headers: {
      Cookie: `session=${token?.value}`,
    },
  });
  cookies().delete("session");
  redirect("/login");
}
