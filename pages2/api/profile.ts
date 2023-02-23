import { NextApiRequest, NextApiResponse } from "next"
import User, { IUser } from "../../models/User"

export default async function Profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await User.find({ newsletter: true })
    res.send(users)
  } else if (req.method === "PUT") {
    const { email, newsletter } = req.body

    try {
      const user = (await User.findOneAndUpdate(
        { email: email },
        { newsletter: newsletter },
        { new: true }
      )) as IUser
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ success: false })
    }
  }
}
