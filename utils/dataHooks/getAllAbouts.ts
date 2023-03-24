import { cache } from "react"
import "server-only"
import db from "../prisma"

const getAllAbouts = cache(async () => {
  return await db.about.findMany()
})

export const preload = () => {
  void getAllAbouts()
}

export default getAllAbouts
