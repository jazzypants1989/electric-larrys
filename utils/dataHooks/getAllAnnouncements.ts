import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { Announcements } from "@/types"

export const preload = () => {
  void getAllAnnouncements()
}

export const getAllAnnouncements = cache(async () => {
  const announcements = await db.announcement.findMany()
  return JSON.parse(JSON.stringify(announcements)) as Announcements
})
