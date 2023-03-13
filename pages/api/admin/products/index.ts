import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../../utils/prisma"
import { Product, Products } from "../../../../utils/dataHooks/getProducts"
type CartItem = {
  id: string
  object: string
  amount_discount: number
  amount_subtotal: number
  amount_tax: number
  amount_total: number
  currency: string
  description: string
  price: {
    id: string
    object: string
    active: boolean
    billing_scheme: string
    created: number
    currency: string
    custom_unit_amount: null
    livemode: boolean
    lookup_key: null
    metadata: {}
    nickname: null
    product: string
    recurring: null
    tax_behavior: string
    tiers_mode: null
    transform_quantity: null
    type: string
    unit_amount: number
    unit_amount_decimal: string
  }
  quantity: number
}

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
  const cartItems = req.body

  console.log(cartItems)

  const products = await db.product.findMany({
    where: {
      name: {
        in: cartItems.map((item: CartItem) => item.description),
      },
    },
  })

  const updatedProducts = products.map((product: Product) => {
    const cartItem = cartItems.find(
      (item: CartItem) => item.description === product.name
    )
    if (!cartItem) {
      return product
    }

    if (product.countInStock < 1) {
      console.log(`Product ${product.name} is out of stock`)
      return product
    }

    console.log(
      `Product ${product.name} has ${product.countInStock} left, ${cartItem.quantity} ordered`
    )

    return {
      ...product,
      countInStock: product.countInStock - cartItem.quantity,
    }
  })

  async function updateDB(products: Products) {
    for (const product of products) {
      await db.product.update({
        where: { id: product.id },
        data: { countInStock: product.countInStock },
      })
    }
  }

  await updateDB(updatedProducts)

  res.send({ message: "Products updated successfully", updatedProducts })
}

export default handler
