import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = (id: string) => {
  void getAnnouncementByID(id)
}

export const getAnnouncementByID = cache(async (id: string) => {
  console.log("getAnnouncementByID")
  const announcement = await db.announcement.findUnique({
    where: { id },
  })
  return announcement
})
