import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { Notes } from "@/types"

export const preload = () => {
  void getNotes()
}

export const getNotes = cache(async () => {
  const notes = await db.note.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      User: true,
    },
  })

  return JSON.parse(JSON.stringify(notes)) as Notes
})
