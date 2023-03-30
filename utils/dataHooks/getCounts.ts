import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = () => {
  void getCounts()
}

export const getCounts = cache(async () => {
  const productsCount = await db.product.count()
  const usersCount = await db.user.count()
  const announcementsCount = await db.announcement.count()
  const notesCount = await db.note.count()
  const sliderPostsCount = await db.post.count()
  return {
    productsCount,
    usersCount,
    announcementsCount,
    notesCount,
    sliderPostsCount,
  }
})
