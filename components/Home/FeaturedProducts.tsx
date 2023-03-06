import type { Product } from "@prisma/client"
import ProductItem from "../Products/ProductItem"

export default function FeaturedProducts({
  featuredProducts,
}: {
  featuredProducts: Product[]
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="mb-4 text-center text-3xl font-bold drop-shadow">
        Featured Products
      </h3>
      <div className="flex aspect-auto w-auto flex-col items-center justify-center rounded-4xl bg-orange bg-opacity-70 object-contain transition-all duration-1000 hover:bg-opacity-80 md:rounded-l-full">
        {featuredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}