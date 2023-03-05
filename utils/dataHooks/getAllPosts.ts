import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = () => {
  void getAllPosts()
}

export const getAllPosts = cache(async () => {
  console.log("getAllPosts")
  const posts = await db.post.findMany()
  return posts
})
