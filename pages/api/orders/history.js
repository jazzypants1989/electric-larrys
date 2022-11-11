import { getSession } from "next-auth/react"
import Order from "../../../models/Order"
import dbConnect from "../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).send({ message: "signin required" })
  }
  const { user } = session
  await dbConnect()
  const orders = await Order.find({ user: user._id })
  res.send(orders)
}

export default handler
