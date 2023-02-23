import { NextApiRequest, NextApiResponse } from "next"
import Product, { IProduct } from "../../../models/Product"
import dbConnect from "../../../utils/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const data = await Product.findById(req.query.id)
  if (!data) {
    res.status(404).json({ success: false })
  }
  const product: IProduct = data
  res.send(product)
}

export default handler
