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

  const product = await db.product.findUnique({
    where: { slug: slugTransform },
  })

  if (product) {
    await db.product.update({
      where: { slug: slugTransform },
      data: req.body,
    })

    res.send({ message: "Product updated successfully" })
  } else {
    res.status(404).send({ message: "Product not found" })
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
