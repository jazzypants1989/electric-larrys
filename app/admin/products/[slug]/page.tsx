import AdminProduct from "./AdminProduct"
import { getProductBySlug } from "../../../../utils/dataHooks/getProductBySlug"
import { getAllTags } from "../../../../utils/dataHooks/getAllTags"
import { getAllCategories } from "../../../../utils/dataHooks/getAllCategories"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const product = await getProductBySlug(slug)

  const tagObjects = await getAllTags()
  const flattenedTags = tagObjects.map((tag) => tag.tags).flat()
  const flattenedUniqueTags = [...new Set(flattenedTags)]

  const categories = await getAllCategories()

  if (!product) {
    notFound()
  }

  return (
    <>
      <AdminProduct
        product={product}
        namedTags={flattenedUniqueTags}
        categories={categories}
      />
    </>
  )
}
