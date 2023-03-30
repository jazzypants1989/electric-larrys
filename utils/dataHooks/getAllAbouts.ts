import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { Abouts } from "@/types"

export const preload = () => {
  void getAllAbouts()
}

const getAllAbouts = cache(async () => {
  const abouts = await db.about.findMany()
  return JSON.parse(JSON.stringify(abouts)) as Abouts
})

export default getAllAbouts
