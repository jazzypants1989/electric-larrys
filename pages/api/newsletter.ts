import { NextApiRequest, NextApiResponse } from "next/types"
import db from "../../utils/prisma"

export default async function Newsletter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      const newUser = await db.user.create({
        data: {
          email,
          newsletter: true,
        },
      })
      console.log(newUser)
      return res.status(200).json({ message: "Thank you for signing up!" })
    }

    if (user.newsletter === true) {
      return res.status(400).json({ message: "You're already a member!!" })
    }

    if (user) {
      user.newsletter = true
      return res.status(200).json({ message: "You're now a member!!" })
    }
  } else {
    res.status(400).json({ message: "Invalid request" })
  }
}
