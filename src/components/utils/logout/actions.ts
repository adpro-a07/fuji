"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const logoutAction = async () => {
  const cookieStore = await cookies()

  cookieStore.delete("kilimanjaro-access")
  cookieStore.delete("kilimanjaro-refresh")

  redirect("/login")
}
