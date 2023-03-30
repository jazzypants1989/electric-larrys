import { cache } from "react"
import "server-only"
import db from "../prisma"

export const preload = () => {
  void getAllCategories()
}

export const getAllCategories = cache(async () => {
  const categories = await db.product.findMany({
    select: {
      category: true,
    },
  })
  const uniqueCategories = [
    ...new Set(categories.map((category) => category.category)),
  ]
  return uniqueCategories
})
