import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = () => {
  void getAllUsers()
}

export const getAllUsers = cache(async () => {
  console.log("getAllUsers")
  const users = await db.user.findMany()
  return users
})
