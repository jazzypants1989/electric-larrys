import { cache } from "react"
import "server-only"
import db from "../prisma"
export const preload = () => {
  void getNonFeaturedPosts()
}

export const getNonFeaturedPosts = cache(async () => {
  console.log("getNonFeaturedPosts")
  const posts = await db.post.findMany({
    where: {
      isPublished: true,
      isFeatured: false,
    },
    take: 4,
  })
  return posts
})
