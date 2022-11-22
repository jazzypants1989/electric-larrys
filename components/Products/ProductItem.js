/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card drop-shadow hover:shadow-2xl hover:shadow-orange hover:translate-y-1 transition-all ease-in-out duration-500">
      <Link href={`/product/${product.slug}`}>
        <a>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5 hover:scale-110 transition-all duration-300 ease-in-out">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-xl">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.category}</p>
        <p>${product.price}</p>
        <button
          className="primary-button drop-shadow hover:drop-shadow-none"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
