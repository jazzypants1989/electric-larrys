import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { Posts } from "@/types"

export const preload = () => {
  void getAllPosts()
}

export const getAllPosts = cache(async () => {
  const posts = await db.post.findMany()
  return JSON.parse(JSON.stringify(posts)) as Posts
})
