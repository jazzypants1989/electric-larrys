import { notFound } from "next/navigation"
import { getProductBySlug } from "../../../utils/dataHooks/getProductBySlug"
import ProductPage from "./ProductPage"
import { getCurrentUser } from "../../../utils/session"
import { Metadata } from "next"
import siteConfig from "../../../utils/siteConfig"

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

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) {
    return notFound()
  }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${siteConfig.siteUrl}/products/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  }
}
