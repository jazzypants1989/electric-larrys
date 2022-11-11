import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { Store } from "../utils/Store"

export default function FakeCart() {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const findTotal = () => {
    let roughTotal = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    return roughTotal.toFixed(2)
  }

  const handleCheckout = async () => {
    const stripe = await getStripe()
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    })
    const data = await response.json()
    await stripe.redirectToCheckout({ sessionId: data.id })
  }

  const closeCart = () => {
    dispatch({ type: "CART_CLOSE" })
  }
  return (
    <div
      onClick={closeCart}
      className="z-50 h-48 bottom-0 rounded-tr-4xl md: rounded-none md:right-0 md:top-0 md:min-h-screen w-96 fixed bg-Red animate-swoosh"
    >
      <div
        className="flex flex-col justify-between h-full"
        onClick={(e) => e.stopPropagation()}
      >
        CART
      </div>
    </div>
  )
}
