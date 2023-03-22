import { cache } from "react"

import db from "../prisma"
export const preload = () => {
  void getNotes()
}

export const getNotes = cache(async () => {
  console.log("getNotes")
  const posts = await db.note.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      User: true,
    },
  })
  return posts
})
