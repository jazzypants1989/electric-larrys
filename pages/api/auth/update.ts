import { getSession } from "next-auth/react"
import bcryptjs from "bcryptjs"
import db from "../../../utils/prisma"
import { NextApiRequest, NextApiResponse } from "next"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} not supported` })
  }

  const session = await getSession({ req })

  if (!session) {
    return res.status(401).send({ message: "signin required" })
  }

  const { user } = session
  const { name, email, password } = req.body

  if (
    !name ||
    !email ||
    !email.includes("@") ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: "Validation error",
    })
    return
  }

  const toUpdateUser = await db.user.findFirst({
    where: {
      name,
      email,
      password: password ? bcryptjs.hashSync(password) : undefined,
    },
  })

  if (!toUpdateUser) {
    res.status(422).json({ message: "User does not exist!" })
    return
  }

  const updatedUser = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      name,
      email,
      password: password ? bcryptjs.hashSync(password) : undefined,
    },
  })

  res.send({
    message: `Updated user ${updatedUser.name}!`,
  })
}

export default handler
