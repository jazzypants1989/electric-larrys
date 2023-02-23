import Image from "next/image"
import Link from "next/link"
import { IProduct } from "../../models/Product"
import Card from "../Layout/Card"

export default function ProductItem({
  product,
  addToCartHandler,
}: {
  product: IProduct
  // eslint-disable-next-line no-unused-vars
  addToCartHandler: (product: IProduct) => void
}) {
  return (
    <Card className="drop-shadow transition-all duration-500 ease-in-out hover:translate-y-1 hover:shadow-2xl hover:shadow-orange">
      <Link href={`/product/${product.slug}`} passHref>
        <div className="aspect-auto w-auto object-contain">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
          />
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center p-5 transition-all duration-300 ease-in-out hover:scale-110">
        <Link href={`/product/${product.slug}`} passHref>
          <h2 className="text-xl text-orange">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.category}</p>
        <p>${product.price}</p>
        <button
          className="primary-button drop-shadow"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </Card>
  )
}
