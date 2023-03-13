"use client"

import Store, { CartItem } from "../../utils/Store"
import Image from "next/image"
import Link from "next/link"
import RiCloseCircleFill from "./Header/Icons/RiCloseCircleFill"
import getStripe from "../../utils/getStripe"
import Card from "./Card"
import { useAtom } from "jotai"
import { Product } from "../../utils/dataHooks/getProducts"
import useCartClick from "../../utils/useCartClick"
import { useRef } from "react"
import useToast from "../../utils/useToast"
import Button from "./Button"

const Cart = () => {
  const [cart, setCart] = useAtom(Store)
  const addToast = useToast()
  const ref = useRef<HTMLDivElement>(null)

  useCartClick(ref, () => setCart({ ...cart, cartOpen: false }))

  const closeCartHandler = () => {
    setCart((prev) => ({ ...prev, cartOpen: false }))
  }

  const toggleCart = () => {
    setCart((prev) => ({ ...prev, cartOpen: !prev.cartOpen }))
  }

  const updateCartHandler = (item: Product, quantity: number) => {
    const { cartItems } = cart
    const product = cartItems.find((x: CartItem) => x.product.id === item.id)
    if (product) {
      if (quantity === 0) {
        setCart((prev) => ({
          ...prev,
          cartItems: prev.cartItems.filter(
            (x: CartItem) => x.product.id !== item.id
          ),
        }))
      } else {
        setCart((prev) => ({
          ...prev,
          cartItems: prev.cartItems.map((x: CartItem) =>
            x.product.id === item.id ? { ...product, quantity } : x
          ),
        }))
      }
    }
  }

  const removeItemHandler = (item: Product) => {
    setCart((prev) => ({
      ...prev,
      cartItems: prev.cartItems.filter((x) => x.product.id !== item.id),
    }))
    addToast(
      `Changed your mind, eh? No problem! ${item.name} removed from cart`,
      true
    )
  }

  const findTotal = () => {
    const { cartItems } = cart
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
    return total
  }

  const handleCheckout = async () => {
    const stripe = await getStripe()

    const { cartItems } = cart

    console.log("cartItems", cartItems)

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    })

    const session = await response.json()

    console.log("session", session)

    if (!stripe) {
      addToast("Stripe is not loaded", false)
      return
    }

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    })

    if (result?.error.message) {
      addToast(result.error.message, false)
    }

    console.log("result", result)

    setCart((prev) => ({ ...prev, cartOpen: false }))

    addToast("Thanks for your purchase! Redirecting to checkout...", true)
  }

  return (
    <div
      className={`min-h-72 fixed bottom-0 z-50 w-88 animate-flyUp scroll-auto rounded-tr-4xl bg-blue shadow-inner shadow-orange md:min-h-screen md:animate-woosh md:rounded-r-cart md:rounded-tr-cart md:shadow-3xl-left md:shadow-orange`}
      ref={ref}
    >
      <div className="flex flex-col items-center justify-between md:pr-16">
        <h3 className="m-4 drop-shadow md:text-lg">Cart full of goodies.</h3>
        {cart.cartItems.length === 0 && (
          <div className="flex h-fit w-full flex-col items-center justify-center gap-5 md:min-h-screen">
            Aw, shucks. There&apos;s nothing here...{" "}
            <Link href="/products" passHref>
              <span
                onClick={() => toggleCart()}
                className="mb-4 cursor-pointer text-lg text-orange underline drop-shadow hover:text-Green"
              >
                Go get some cool stuff!
              </span>
            </Link>
            <button
              onClick={closeCartHandler}
              className="-translate-y-4 rounded-full bg-orange text-blue drop-shadow duration-300 hover:scale-125 hover:text-Red"
            >
              <RiCloseCircleFill />
            </button>
          </div>
        )}
        {cart.cartItems.length > 0 && cart.cartItems.length < 7 && (
          <div className="grid grid-cols-2 md:gap-5">
            <div className="min-w-full md:col-span-3">
              <table className="w-84 min-w-full">
                <tbody>
                  {cart.cartItems.map((item: CartItem) => (
                    <tr key={item.product.slug} className="border-b pr-2">
                      <td className="p-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          passHref
                          className="flex items-center justify-center "
                          onClick={() => toggleCart()}
                        >
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={100}
                            height={100}
                          ></Image>
                          &nbsp;
                        </Link>
                      </td>
                      <td className="m-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="md:text-sm"
                          onClick={() => toggleCart()}
                        >
                          {item.product.name}
                        </Link>
                      </td>
                      <td className="">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(
                              item.product,
                              Number(e.target.value)
                            )
                          }
                        >
                          {[...Array(item.product.countInStock).keys()].map(
                            (x: number) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </select>
                      </td>
                      <td className="px-3 text-right text-base">
                        ${item.product.price * item.quantity}
                      </td>
                      <td className="px-3 text-right">
                        <button
                          onClick={() => removeItemHandler(item.product)}
                          className="text-red text-2xl"
                        >
                          <RiCloseCircleFill />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Card className="relative right-24 bottom-44 h-fit w-max border-2 border-orange bg-blue p-5 md:right-0 md:left-14 md:bottom-0">
              <ul>
                <li>
                  <div className="pb-3 md:text-lg">
                    Subtotal (
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                    {findTotal()}
                  </div>
                </li>
                <li>
                  <Button onClick={handleCheckout} className="md:w-full">
                    Check Out
                  </Button>
                </li>
              </ul>
            </Card>
            <button
              onClick={closeCartHandler}
              className="absolute right-0 top-0 h-7 w-7"
            >
              <RiCloseCircleFill />
            </button>
          </div>
        )}
        {cart.cartItems.length > 6 && (
          <div className="ml-12 flex flex-col items-center justify-center gap-5 md:ml-24 md:min-h-screen">
            <h3 className="text-lg">
              Too many items for the flyover cart. Let&apos;s go to the big cart
              page!
            </h3>
            <Link href="/cart" passHref>
              <span
                onClick={() => toggleCart()}
                className="mb-4 cursor-pointer text-lg text-orange underline drop-shadow hover:text-Green"
              >
                Go to cart page
              </span>
            </Link>
            <button
              onClick={closeCartHandler}
              className="-translate-y-4 rounded-full bg-orange text-blue drop-shadow duration-300 hover:scale-125 hover:text-Red"
            >
              <RiCloseCircleFill />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
