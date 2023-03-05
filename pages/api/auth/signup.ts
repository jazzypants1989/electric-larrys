import bcryptjs from "bcryptjs"
import db from "../../../utils/prisma"
import { NextApiRequest, NextApiResponse } from "next"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return
  }
  const { name, email, password, newsletter } = req.body
  console.log(name, email, newsletter)
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: "Validation error",
    })
    return
  }

  const existingUser = await db.user.findFirst({
    where: {
      email: email,
    },
  })

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" })
    return
  }

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: bcryptjs.hashSync(password),
      newsletter,
      isAdmin: false,
      isEmployee: false,
    },
  })

  const user = {
    _id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    isEmployee: newUser.isEmployee,
    newsletter: newUser.newsletter,
  }

  res.status(201).send({
    message: "Created user!",
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isEmployee: user.isEmployee,
    newsletter: user.newsletter,
  })
}

export default handler
