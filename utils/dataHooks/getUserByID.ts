import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { User } from "@/types"

export const preload = (id: string) => {
  void getUserByID(id)
}

export const getUserByID = cache(async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
  })

  return JSON.parse(JSON.stringify(user)) as User
})
