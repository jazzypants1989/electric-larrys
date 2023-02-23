import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import Product from "../../../../../models/Product"
import dbConnect from "../../../../../utils/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("signin required")
  }

  if (req.method === "GET") {
    return getHandler(req, res)
  } else if (req.method === "PUT") {
    return putHandler(req, res)
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}
const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const product = await Product.findById(req.query.id)
  res.send(product)
}
const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const product = await Product.findById(req.query.id)
  if (product) {
    product.name = req.body.name
    product.slug = req.body.slug
    product.price = req.body.price
    product.category = req.body.category
    product.image = req.body.image
    product.tags = req.body.tags
    product.countInStock = req.body.countInStock
    product.description = req.body.description
    product.isRented = req.body.isRented
    product.isFeatured = req.body.isFeatured
    product.isOnSale = req.body.isOnSale
    product.salePrice = req.body.salePrice
    await product.save()
    res.send({ message: "Product updated successfully" })
  } else {
    res.status(404).send({ message: "Product not found" })
  }
}
const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const product = await Product.findById(req.query.id)
  if (product) {
    await product.remove()
    res.send({ message: "Product deleted successfully" })
  } else {
    res.status(404).send({ message: "Product not found" })
  }
}
export default handler
