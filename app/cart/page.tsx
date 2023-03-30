"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAtom } from "jotai"

import Store, { CartItem } from "../../utils/Store"
import useToast from "../../utils/useToast"
import getStripe from "../../utils/getStripe"
import Card from "../../components/Layout/Card"
import RiCloseCircleFill from "../../components/Layout/Header/Icons/RiCloseCircleFill"
import Button from "../../components/Layout/Button"

import type { Product } from "@/types"

const Cart = () => {
  const [cart, setCart] = useAtom(Store)
  const router = useRouter()
  const addToast = useToast()

  const updateCartHandler = (item: Product, quantity: number) => {
    const { cartItems } = cart
    const product = cartItems.find((x: CartItem) => x.product.id === item.id)
    if (product) {
      if (quantity === 0) {
        setCart((prev) => ({
          ...prev,
          cartItems: prev.cartItems.filter((x) => x.product.id !== item.id),
        }))
        addToast(
          `Changed your mind, eh? No problem! ${item.name} removed from cart`,
          true
        )
      } else if (item.countInStock < quantity) {
        setCart((prev) => ({
          ...prev,
          cartItems: prev.cartItems.map((x: CartItem) =>
            x.product.id === item.id
              ? { ...product, quantity: item.countInStock }
              : x
          ),
        }))
        addToast(
          `Sorry, we only have ${item.countInStock} of ${item.name} in stock.`,
          false
        )
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
    addToast(`${item.name} removed from cart`, true)
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

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    })

    const session = await response.json()

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

    setCart((prev) => ({ ...prev, cartOpen: false }))

    addToast("Thanks for shopping with us!", true)
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="h-full w-full overflow-y-auto">
        {cart.cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <Button onClick={() => router.push("/products")}>
              <Link href="/products">Go get some cool stuff!!</Link>
            </Button>
          </div>
        ) : (
          cart.cartItems.map((item: CartItem) => (
            <Card key={item.product.id} className="h-auto w-full">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-start">
                  <Image
                    src={item.product.image}
                    width={100}
                    height={100}
                    alt={item.product.name}
                  />
                  <div className="ml-4 flex flex-col items-start justify-start">
                    <h1 className="text-xl font-bold">{item.product.name}</h1>
                    <h1 className="text-lg font-medium">
                      Price: {item.product.price}$
                    </h1>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-end">
                  <div className="ml-4 flex flex-row items-center justify-center">
                    <button
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-Yellow text-xl text-Red hover:bg-Red hover:text-Yellow"
                      onClick={() =>
                        updateCartHandler(item.product, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <h1 className="mx-4 text-xl font-bold">{item.quantity}</h1>
                    <button
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-Yellow text-xl text-Red hover:bg-Red hover:text-Yellow"
                      onClick={() =>
                        updateCartHandler(item.product, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="ml-4 flex h-16 w-16 items-center justify-center rounded-full hover:scale-125"
                    onClick={() => removeItemHandler(item.product)}
                  >
                    <RiCloseCircleFill />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
      <div className="flex h-auto w-full flex-row items-center justify-between p-4">
        <h1 className="text-xl font-bold">Total: {findTotal()}$</h1>
        <Button
          className="h-12 w-32 rounded-full font-bold"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}

export default Cart
