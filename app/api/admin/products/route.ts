import { getCurrentUser } from "../../../../utils/session"
import { NextRequest, NextResponse } from "next/server"
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

// const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
export async function POST() {
  const user = await getCurrentUser()

  if (!user || (user && !user.isEmployee)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const product = await db.product.create({
    data: {
      name: "sample name",
      slug: "slug-" + Math.random().toString(36).substring(2, 9),
      image: `${process.env.NEXT_PUBLIC_BASE_URL}/images/bg1.jpg`,
      price: 10,
      category: "one category here, 1-3 words",
      tags: ["oddities", "miscellaneous"],
      countInStock: 0,
      description: "More details about the product",
      isFeatured: false,
      isOnSale: false,
      salePrice: 5,
    },
  })

  return NextResponse.json(product)
}

export async function PUT(request: NextRequest) {
  const cartItems = await request.json()

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

  return NextResponse.json({
    message: `Successfully updated ${updatedProducts.length} products`,
    cartItems,
  })
}
