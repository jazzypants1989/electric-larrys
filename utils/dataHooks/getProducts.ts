import { cache } from "react"
import "server-only"
import db from "../prisma"
export const preload = () => {
  void getProducts()
}

export const getProducts = cache(async () => {
  const products = await db.product.findMany()
  if (!products) {
    throw new Error("No products found")
  }
  return products
})

export type Products = Awaited<ReturnType<typeof getProducts>>
export type Product = Products[number]
