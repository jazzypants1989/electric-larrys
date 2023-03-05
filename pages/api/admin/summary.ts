import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import db from "../../../utils/prisma"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("signin required")
  }

  const productsCount = await db.product.count()
  const usersCount = await db.user.count()
  const announcementsCount = await db.announcement.count()
  const notesCount = await db.note.count()
  const sliderPostsCount = await db.post.count()

  res.send({
    productsCount,
    usersCount,
    announcementsCount,
    notesCount,
    sliderPostsCount,
  })
}

export default handler
