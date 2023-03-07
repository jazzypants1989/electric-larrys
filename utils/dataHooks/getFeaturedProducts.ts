import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = () => {
  void getFeaturedProducts()
}

export const getFeaturedProducts = cache(async () => {
  console.log("getFeaturedProducts")
  const products = await db.product.findMany({
    where: {
      isFeatured: true,
    },
    take: 4,
  })
  return products
})
