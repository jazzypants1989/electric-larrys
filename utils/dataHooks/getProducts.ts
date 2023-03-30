import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { Products } from "@/types"

export const preload = () => {
  void getProducts()
}

export const getProducts = cache(async () => {
  const products = await db.product.findMany()

  return JSON.parse(JSON.stringify(products)) as Products
})
