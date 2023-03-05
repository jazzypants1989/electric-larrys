import { NextApiRequest, NextApiResponse } from "next"
import db from "../../utils/prisma"

export default async function Profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await db.user.findMany({
      select: {
        email: true,
        newsletter: true,
      },
    })
    res.send(users)
  } else if (req.method === "PUT") {
    const { email, newsletter } = req.body

    try {
      const user = (await db.user.update({
        where: { email },
        data: { newsletter },
      })) as { email: string; newsletter: boolean }

      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ success: false })
    }
  }
}
