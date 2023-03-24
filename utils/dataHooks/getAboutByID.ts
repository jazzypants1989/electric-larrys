import { cache } from "react"
import "server-only"
import db from "../prisma"

const getAbout = cache(async (id: string) => {
  return await db.about.findUnique({
    where: {
      id: id,
    },
  })
})

export const preload = (id: string) => {
  void getAbout(id)
}

export default getAbout
