import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = (id: string) =>
  cache(async () => {
    void getProductByID(id)
  })

export const getProductByID = cache(async (id: string) => {
  const product = await db.product.findFirst({
    where: { id },
  })

  return product
})
