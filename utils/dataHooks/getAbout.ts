import { cache } from "react"
import "server-only"
import db from "../prisma"

const getAbout = cache(async () => {
  return await db.about.findFirst({
    where: {
      isPublished: true,
    },
  })
})

export const preload = () => {
  void getAbout()
}

export default getAbout
