import db from "../prisma"
import { cache } from "react"
import "server-only"

export const preload = () => {
  void getNewsletterUsers()
}

export const getNewsletterUsers = cache(async () => {
  console.log("getNewsletterUsers")
  const users = await db.user.findMany({
    where: { newsletter: true },
  })
  return users
})
