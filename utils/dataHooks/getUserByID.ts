import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = (id: string) => {
  void getUserByID(id)
}

export const getUserByID = cache(async (id: string) => {
  console.log("getUserByID")
  const user = await db.user.findUnique({
    where: { id },
  })
  return user
})
