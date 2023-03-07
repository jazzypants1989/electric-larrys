import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = (id: string) => {
  void getPostByID(id)
}

export const getPostByID = cache(async (id: string) => {
  console.log("getPostByID")
  const post = await db.post.findUnique({
    where: { id },
  })
  return post
})
