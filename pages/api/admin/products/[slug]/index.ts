import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../../../utils/prisma"

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
  const slug = req.query.slug?.toString()

  const product = await db.product.findUnique({
    where: { slug },
  })

  if (!product) {
    return res.status(404).send({ message: "Product not found" })
  }

  res.send(product)
}
const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug

  const slugTransform = slug?.toString()

  const {
    name,
    description,
    price,
    category,
    tags,
    image,
    isFeatured,
    isOnSale,
    salePrice,
    countInStock,
  } = req.body

  // // data validation
  if (!name || !description || !price || !category || !tags || !image) {
    return res
      .status(400)
      .send({ message: "One or more required fields are missing" })
  }

  // if tags is not an array
  if (!Array.isArray(tags)) {
    return res.status(400).send({ message: "Tags must be an array" })
  }

  if (tags.length < 1) {
    return res.status(400).send({ message: "Tags must be at least 1" })
  }

  if (price < 0 || salePrice < 0) {
    return res
      .status(400)
      .send({ message: "Price or Sale Price must be greater than 0" })
  }

  if (countInStock < 0) {
    return res
      .status(400)
      .send({ message: "Count in stock must be greater than 0" })
  }

  if (typeof isFeatured !== "boolean" || typeof isOnSale !== "boolean") {
    return res
      .status(400)
      .send({ message: "isFeatured and isOnSale must be boolean" })
  }

  if (isOnSale && !salePrice) {
    return res
      .status(400)
      .send({ message: "Sale price is required if product is on sale" })
  }

  const product = await db.product.findUnique({
    where: { slug: slugTransform },
  })

  if (product) {
    await db.product.update({
      where: { slug: slugTransform },
      data: {
        name,
        description,
        price,
        category,
        tags,
        image,
        isFeatured,
        isOnSale,
        salePrice,
        countInStock,
      },
    })

    res.status(200).send({ message: "Product updated successfully" })
  } else {
    res.status(404).send({ message: `Product with slug ${slug} not found` })
  }
}
const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug

  const slugTransform = slug?.toString()

  const product = await db.product.findUnique({
    where: { slug: slugTransform },
  })

  if (product) {
    await db.product.delete({
      where: { slug: slugTransform },
    })

    res.send({ message: "Product deleted successfully" })
  } else {
    res.status(404).send({ message: "Product not found" })
  }
}
export default handler
