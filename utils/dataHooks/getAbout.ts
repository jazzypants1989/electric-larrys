import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { About } from "@/types"

const getAbout = cache(async () => {
  const about = await db.about.findFirst({
    where: {
      isPublished: true,
    },
  })

  return JSON.parse(JSON.stringify(about)) as About
})

export const preload = () => {
  void getAbout()
}

export default getAbout
