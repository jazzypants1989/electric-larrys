import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { Post } from "@/types"

export const preload = (id: string) => {
  void getPostByID(id)
}

export const getPostByID = cache(async (id: string) => {
  const post = await db.post.findUnique({
    where: { id },
  })

  return JSON.parse(JSON.stringify(post)) as Post
})
