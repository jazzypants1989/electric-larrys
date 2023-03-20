import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = () => {
  void getAllProducts()
}

export const getAllProducts = cache(async () => {
  console.log("getAllProducts")
  const products = await db.product.findMany()
  return products
})
