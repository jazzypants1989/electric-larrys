import db from "../prisma"
import { cache } from "react"
import "server-only"

import type { Users } from "@/types"

export const preload = () => {
  void getNewsletterUsers()
}

export const getNewsletterUsers = cache(async () => {
  const users = await db.user.findMany({
    where: { newsletter: true },
  })

  return JSON.parse(JSON.stringify(users)) as Users
})
