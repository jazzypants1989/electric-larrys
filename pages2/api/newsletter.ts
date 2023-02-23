import { NextApiRequest, NextApiResponse } from "next/types"
import User, { IUser } from "../../models/User"

export default async function Newsletter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users: IUser[] = await User.find({ newsletter: true }).select(
      "-password"
    )
    res.status(200).json(users)
  } else if (req.method === "POST") {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    const data = await User.findOne({ email })

    if (!data) {
      const newUser = new User({
        email,
        newsletter: true,
        password: "dummy",
        name: "dummy",
      })
      await newUser.save()
      return res.status(200).json({ message: "Thank you for signing up!" })
    }

    const user: IUser = data

    if (user.newsletter === true) {
      return res.status(400).json({ message: "You're already a member!!" })
    }

    if (user) {
      user.newsletter = true
      await user.save()
      return res.status(200).json({ message: "You're now a member!!" })
    }
  } else {
    res.status(400).json({ message: "Invalid request" })
  }
}
