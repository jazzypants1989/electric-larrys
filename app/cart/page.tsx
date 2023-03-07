"use client"

import Store, { CartItem } from "../../utils/Store"
import Image from "next/image"
import Link from "next/link"
import getStripe from "../../utils/getStripe"
import { useAtom } from "jotai"
import { Product } from "../../utils/dataHooks/getProducts"
import toastStore from "../../utils/ToastStore"
import Card from "../../components/Layout/Card"
import RiCloseCircleFill from "../../components/Layout/Header/Icons/RiCloseCircleFill"

const Cart = () => {
  const [cart, setCart] = useAtom(Store)
  const [, setToasts] = useAtom(toastStore)

  const updateCartHandler = (item: Product, quantity: number) => {
    const { cartItems } = cart
    const product = cartItems.find((x: CartItem) => x.product.id === item.id)
    if (product) {
      if (quantity === 0) {
        setCart((prev) => ({
          ...prev,
          cartItems: prev.cartItems.filter((x) => x.product.id !== item.id),
        }))
        setToasts((prev) => ({
          ...prev,
          toasts: [
            ...prev.toasts,
            {
              message: `Changed your mind, eh? No problem! ${item.name} removed from cart`,
              success: true,
              id: Math.random() * 1000 + "",
            },
          ],
        }))
      } else if (item.countInStock < quantity) {
        setToasts((prev) => ({
          ...prev,
          toasts: [
            ...prev.toasts,
            {
              message: `Sorry, we only have ${item.countInStock} of ${item.name} in stock`,
              success: false,
              id: Math.random() * 1000 + "",
            },
          ],
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
    setToasts((prev) => ({
      ...prev,
      toasts: [
        ...prev.toasts,
        {
          message: `Changed your mind, eh? No problem! ${item.name} removed from cart`,
          success: true,
          id: Math.random() * 1000 + "",
        },
      ],
    }))
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
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            message: "Stripe is not loaded",
            success: false,
            id: Math.random() * 1000 + "",
          },
        ],
      }))
      return
    }

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    })

    if (result?.error.message) {
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            message: `${result.error.message}`,
            success: false,
            id: Math.random() * 1000 + "",
          },
        ],
      }))
    }

    setCart((prev) => ({ ...prev, cartOpen: false }))

    setToasts((prev) => ({
      ...prev,
      toasts: [
        ...prev.toasts,
        {
          message: `Thanks for your purchase! Redirecting to checkout...`,
          success: true,
          id: Math.random() * 1000 + "",
        },
      ],
    }))
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="h-full w-full overflow-y-auto">
        {cart.cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <Link className="primary-button" href="/products">
              Go buy some cool stuff!!
            </Link>
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
        <button
          className="primary-button flex h-12 w-32 items-center justify-center rounded-full font-bold"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
