import { getSession } from "next-auth/react"
import bcryptjs from "bcryptjs"
import User from "../../../models/User"
import dbConnect from "../../../utils/db"
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

  await dbConnect()

  const toUpdateUser = await User.findByIdAndUpdate(user?._id, {
    name,
    email,
    password: password ? bcryptjs.hashSync(password) : undefined,
  })

  await toUpdateUser.save()

  res.send({
    message: "User updated",
  })
}

export default handler
