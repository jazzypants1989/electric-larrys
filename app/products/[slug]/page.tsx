import { notFound } from "next/navigation"
import { getProductBySlug } from "../../../utils/dataHooks/getProductBySlug"
import ProductPage from "./ProductPage"
import { getCurrentUser } from "../../../utils/session"

export default async function ProductScreen({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const product = await getProductBySlug(slug)

  if (!product) {
    return notFound()
  }

  const user = await getCurrentUser()

  if (!user || !user.isEmployee) {
    return <ProductPage product={product} isAdmin={false} />
  }

  if (user.isEmployee) {
    return <ProductPage product={product} isAdmin={true} />
  }
}
