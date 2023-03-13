import { getProductByID } from "../../../../utils/dataHooks/getProductByID"
import { notFound } from "next/navigation"
import ProductID from "./ProductID"

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const product = await getProductByID(id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <ProductID product={product} />
    </>
  )
}
