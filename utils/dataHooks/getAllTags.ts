import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = () => {
  void getAllTags()
}

export const getAllTags = cache(async () => {
  console.log("getAllTags")
  const tags = await db.product.findMany({
    select: {
      tags: true,
    },
  })
  return tags
})
