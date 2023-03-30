import { cache } from "react"
import "server-only"
import db from "../prisma"

import type { Product } from "@/types"

export const preload = (slug: string) =>
  cache(async () => {
    void getProductBySlug(slug)
  })

export const getProductBySlug = cache(async (slug: string) => {
  const product = await db.product.findFirst({
    where: { slug },
  })

  return JSON.parse(JSON.stringify(product)) as Product
})
