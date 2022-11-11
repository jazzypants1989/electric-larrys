import { getSession } from "next-auth/react"
import User from "../../../../models/User"
import dbConnect from "../../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("admin signin required")
  }
  await dbConnect()
  const users = await User.find({})
  res.send(users)
}

export default handler
