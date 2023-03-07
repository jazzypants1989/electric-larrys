import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../../utils/prisma"
import { Product } from "../../../../utils/dataHooks/getProducts"
import { CartItem } from "../../../../utils/Store"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return postHandler(req, res)
  } else if (req.method === "PUT") {
    return putHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("admin signin required")
  }
  const product = await db.product.create({
    data: {
      name: "sample name",
      slug: "this-is-a-slug_good-for-seo-without-these-numbers" + Date.now(),
      image: "/images/bg1.jpg",
      price: 10,
      category: "one category here, 1-3 words",
      tags: ["tag1", "tag2", "tag3"],
      countInStock: 0,
      description: "More details about the product",
      isFeatured: false,
      isOnSale: false,
      salePrice: 5,
    },
  })

  res.send({ message: "Product created successfully", product })
}

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cartItems } = req.body

  const productsInDb = await db.product.findMany({
    where: {
      id: {
        in: cartItems.map((cartItem: CartItem) => cartItem.product.id),
      },
    },
  })

  const updatedProductsInDb = await Promise.all(
    productsInDb.map((productInDb: Product) => {
      const cartItem: CartItem = cartItems.find(
        (cartItem: CartItem) => cartItem.product.id === productInDb.id
      )

      const countInStock = productInDb.countInStock - cartItem.quantity

      return db.product.update({
        where: { id: productInDb.id },
        data: { countInStock },
      })
    })
  )

  res.send({ message: "Products updated successfully", updatedProductsInDb })
}

export default handler
