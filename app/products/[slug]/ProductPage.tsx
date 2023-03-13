"use client"

import Image from "next/image"
import Link from "next/link"
import { useAtom } from "jotai"

import Card from "../../../components/Layout/Card"
import Store, { CartItem, reactions } from "../../../utils/Store"
import { Product } from "../../../utils/dataHooks/getProducts"
import useToast from "../../../utils/useToast"
import Button from "../../../components/Layout/Button"

export default function ProductPage({
  product,
  isAdmin,
}: {
  product: Product
  isAdmin: boolean
}) {
  const [cart, setCart] = useAtom(Store)
  const addToast = useToast()

  if (!product) {
    return (
      <h1 className="my-10 text-center text-3xl font-bold text-Red drop-shadow">
        Man, that sounds awesome, but I don&apos;t think we have that.
      </h1>
    )
  }

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find(
      (x) => x.product.slug === product.slug
    )
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (product.countInStock < quantity) {
      addToast(
        `Sorry, that's so cool that it is flying off the shelf! We only have ${product.countInStock} of ${product.name} in stock.`,
        false
      )
    }

    setCart((prev) => ({
      ...prev,
      cartItems: existItem
        ? prev.cartItems.map((x: CartItem) =>
            x.product.slug === product.slug ? { ...existItem, quantity } : x
          )
        : [...prev.cartItems, { product, quantity }],
      cartOpen: true,
    }))
    addToast(
      `${product.name} added to your cart! ${
        reactions[Math.floor(Math.random() * reactions.length)]
      }`,
      true
    )
  }
  return (
    <>
      <div className="mx-5 my-2 flex flex-col items-start justify-center text-center font-bold text-Green drop-shadow">
        <Link href="/products" passHref>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer hover:text-orange"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <Link href="/products" className="cursor-pointer hover:text-orange">
          back to products
        </Link>
        {isAdmin && (
          <Link
            href={`/admin/products/${product.slug}`}
            passHref
            className="cursor-pointer hover:text-orange"
          >
            <Button>Edit</Button>
          </Link>
        )}
      </div>
      <div className="mx-auto flex flex-col items-center justify-center rounded-md px-5 shadow-md md:flex-row md:items-start md:justify-between md:shadow-xl">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-md object-contain"
          priority
        ></Image>
        <div className="leading-10">
          <ul>
            <li>
              <h1 className="mb-4 border-b-2 border-b-orange pb-0 text-center text-2xl font-extralight drop-shadow">
                {product.name}
              </h1>
            </li>
            <li className="drop-shadow">
              <span className="border-l-4 border-t-4 border-orange p-2 text-sm text-orange">
                Category:
              </span>
              <span className="inline">{product.category}</span>
            </li>
            <li className="mt-2 whitespace-pre-wrap drop-shadow">
              <span className="mb-2 inline border-l-4 border-orange p-2 text-sm text-orange">
                Tags:
              </span>
              <span className="inline">{product.tags.join(", ")}</span>
            </li>
            <li className="mt-4 rounded-md border-b-4 border-r-4 border-orange p-2 drop-shadow">
              <span className="p-2 text-sm text-orange">Description:</span>{" "}
              <span>{product.description}</span>
            </li>
          </ul>
        </div>
        <Card className="leading-5 drop-shadow">
          <div className="card p-5">
            <div className="mb-2 flex justify-center">
              <div className="p-2 text-orange">Price</div>
              <div className="p-2 text-lg">${product.price}</div>
            </div>
            <div className="mb-2 flex justify-center">
              <div className="p-2 text-left text-orange">In Stock? </div>
              <div className="m-2 text-center">
                {product.countInStock > 0
                  ? "Yeah, we've got at least one!"
                  : "Dang Nabbit, I think we sold 'em all!"}
              </div>
            </div>
            <Button className="w-full" onClick={addToCartHandler}>
              Add to cart
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}
