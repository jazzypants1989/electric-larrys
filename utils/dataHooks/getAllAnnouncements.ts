import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = () => {
  void getAllAnnouncements()
}

export const getAllAnnouncements = cache(async () => {
  console.log("getAllAnnouncements")
  const announcements = await db.announcement.findMany()
  return announcements
})

export type IAnnouncement = Awaited<
  ReturnType<typeof getAllAnnouncements>
>[number]
