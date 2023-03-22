import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../../utils/prisma"

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const products = await db.product.deleteMany()

  console.log(products)

  res.send({ message: "Products deleted successfully" })
}

export default deleteHandler
