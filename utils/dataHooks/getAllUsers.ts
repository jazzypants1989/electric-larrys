import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { Users } from "@/types"

export const preload = () => {
  void getAllUsers()
}

export const getAllUsers = cache(async () => {
  console.log("getAllUsers")
  const users = await db.user.findMany()
  return JSON.parse(JSON.stringify(users)) as Users
})
