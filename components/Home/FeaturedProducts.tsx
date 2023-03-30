import ProductItem from "../Products/ProductItem"

import type { Product, Products } from "@/types"

export default function FeaturedProducts({
  featuredProducts,
}: {
  featuredProducts: Products
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="mb-4 text-center text-3xl font-bold tracking-wider drop-shadow">
        Featured Products
      </h3>
      <div className="flex w-auto flex-col items-center justify-center rounded-4xl bg-orange bg-opacity-70 object-contain transition-all duration-1000 hover:bg-opacity-80 md:rounded-l-full">
        {featuredProducts.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
