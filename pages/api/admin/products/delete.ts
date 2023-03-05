import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../../utils/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("admin signin required")
  }

  if (req.method === "GET") {
    res.send({ message: "Mass Product Deletion is disabled" })
    // await db.product.deleteMany()
    // return res.status(200).send({ message: "Products deleted successfully" })
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}
