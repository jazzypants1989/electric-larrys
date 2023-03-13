import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = () => {
  void getAllPictures()
}

export const getAllPictures = cache(async () => {
  console.log("getAllPictures")
  const pictures = await db.post.findMany({
    select: {
      image: true,
    },
  })
  return pictures
})
