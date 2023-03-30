import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { Announcement } from "@/types"

export const preload = (id: string) => {
  void getAnnouncementByID(id)
}

export const getAnnouncementByID = cache(async (id: string) => {
  const announcement = await db.announcement.findUnique({
    where: { id },
  })
  return JSON.parse(JSON.stringify(announcement)) as Announcement
})
