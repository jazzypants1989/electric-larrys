import { Suspense } from "react"
import { getProducts } from "../../utils/dataHooks/getProducts"
import Spinner from "./loading"
import Products from "./Products"

export default async function ProductsPage() {
  const products = await getProducts()

  const productsInStock = products.filter((product) => product.countInStock > 0)

  const categories = productsInStock.map((product) => product.category)
  const uniqueCategories = [...new Set(categories)]

  const tags = productsInStock.map((product) => product.tags)
  const uniqueFlattenedTags = [...new Set(tags.flat())]

  return (
    <Suspense fallback={<Spinner />}>
      <Products
        products={productsInStock}
        categories={uniqueCategories}
        tags={uniqueFlattenedTags}
      />
    </Suspense>
  )
}
