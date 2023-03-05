import AdminProduct from "./AdminProduct"
import { getProductBySlug } from "../../../../utils/dataHooks/getProductBySlug"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <AdminProduct product={product} />

}