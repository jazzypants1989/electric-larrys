import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = () => {
  void getFeaturedPosts()
}

export const getFeaturedPosts = cache(async () => {
  console.log("getFeaturedPosts")
  const posts = await db.post.findMany({
    where: {
      isPublished: true,
      isFeatured: true,
    },
    take: 4,
  })
  return posts
})

export type IPost = Awaited<ReturnType<typeof getFeaturedPosts>>[number]
