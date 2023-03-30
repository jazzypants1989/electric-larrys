import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { About } from "@/types"

export const preload = (id: string) => {
  void getAbout(id)
}

const getAbout = cache(async (id: string) => {
  const about = await db.about.findUnique({
    where: { id },
  })

  return JSON.parse(JSON.stringify(about)) as About
})

export default getAbout
