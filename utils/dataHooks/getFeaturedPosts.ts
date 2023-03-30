import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { Posts } from "@/types"

export const preload = () => {
  void getFeaturedPosts()
}

export const getFeaturedPosts = cache(async () => {
  const posts = await db.post.findMany({
    where: {
      isPublished: true,
      isFeatured: true,
    },
    take: 4,
  })

  return JSON.parse(JSON.stringify(posts)) as Posts
})
