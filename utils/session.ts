import { Session } from "next-auth"
import { getServerSession } from "next-auth/next"

import { AuthOptions } from "../pages/api/auth/[...nextauth]"

export async function getSession() {
  return await getServerSession(AuthOptions)
}

export async function getCurrentUser() {
  const session = (await getSession()) as Session

  return session?.user
}
