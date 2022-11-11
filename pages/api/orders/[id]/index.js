// /api/orders/:id
import { getSession } from "next-auth/react"
import Order from "../../../../models/Order"
import dbConnect from "../../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).send("signin required")
  }

  await dbConnect()

  const order = await Order.findById(req.query.id)
  res.send(order)
}

export default handler
