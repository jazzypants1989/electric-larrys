import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { Products } from "@/types"

export const preload = () => {
  void getFeaturedProducts()
}

export const getFeaturedProducts = cache(async () => {
  const products = await db.product.findMany({
    where: {
      isFeatured: true,
    },
    take: 4,
  })

  return JSON.parse(JSON.stringify(products)) as Products
})
