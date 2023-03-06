"use client"

import { useAtom } from "jotai"
import { use, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Store from "../../utils/Store"

export default function Success({ stripe }: { stripe: any }) {
  const [cart, setCart] = useAtom(Store)

  const searchParams = useSearchParams()

  const session = searchParams?.get("session_id")

  const order: Order = use(
    stripe.checkout.sessions.retrieve(session, {
      expand: ["line_items", "payment_intent"],
    })
  )

  useEffect(() => {
    setCart({
      cartItems: [],
      cartOpen: false,
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  console.log(cart)

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-3xl font-bold drop-shadow">
          Order Failed
        </h1>
        <p className="text-center">
          We were unable to process your order. This could be a bug, so wait
          five minutes and see if you get a confirmation e-mail from Stripe. If
          no confirmation email arrives, please try again. If the problem
          persists, please contact us at electriclarrys@gmail.com. <br />
          <Link href="/">Go back to the home page and try again.</Link>
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="space-around flex flex-col items-center text-center">
        <h1 className="text-center text-3xl font-bold drop-shadow">
          Thank you for your order!
        </h1>
        <div>
          <Image src="/images/wow.webp" alt="wow" width={400} height={250} />
        </div>
        <h2 className="mt-4 text-xl underline drop-shadow">
          Order &quot;Number&quot;
        </h2>
        <span className="text-lg">{order.payment_intent.id}</span>

        <h2 className="mt-2 text-xl underline drop-shadow">
          Confirmation Email
        </h2>
        <span className="text-lg">{order.customer_details.email}</span>

        <h4 className="mt-2 text-xl underline drop-shadow">Items Ordered:</h4>
        <table className="mt-2 table-auto border-2 border-orange">
          <thead className="bg-orange text-sm">
            <tr className="p-4">
              <th className="p-4">Item</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Price</th>
            </tr>
          </thead>
          {order.line_items.data.map((item) => (
            <tr key={item.id} className="p-4">
              <td className="border-b border-orange p-4 ">{item.name}</td>
              <td className="border-b border-orange p-4">{item.quantity}</td>
              <td className="border-b border-orange p-4 drop-shadow">
                ${item.amount_total / 100}
              </td>
            </tr>
          ))}
          <tfoot className="text-right">
            <tr>
              <td colSpan={3}>
                <strong className="mr-3 p-2 text-sm drop-shadow">
                  Subtotal: $
                  {order.line_items.data.reduce(
                    (a, c) => a + c.quantity * c.amount_total,
                    0
                  ) / 100}
                </strong>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <strong className="mr-3 border-b border-orange p-2 pb-0 text-sm drop-shadow">
                  Shipping: ${order.shipping_cost.amount_total / 100}
                </strong>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <strong className="mr-3 p-2 text-sm drop-shadow">
                  Total: ${order.amount_total / 100}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
        <div
          className="mt-4 flex w-full flex-col items-center justify-center space-y-4"
          style={{ maxWidth: "400px" }}
        >
          <h2 className="mt-2 text-xl underline drop-shadow">
            Shipping Address
          </h2>
          <div className="flex w-full max-w-sm flex-col items-center justify-center space-y-2">
            <p className="text-sm">
              {order.shipping_details.address.line1} <br />
            </p>
            {order.shipping_details.address.line2 && (
              <p className="text-sm">
                {order.shipping_details.address.line2}
                <br />
              </p>
            )}
            <p className="text-sm">
              {order.shipping_details.address.city},{" "}
              {order.shipping_details.address.state}
            </p>
            <p className="text-sm">
              {order.shipping_details.address.postal_code}
            </p>
            <p className="text-sm">{order.shipping_details.address.country}</p>
          </div>
        </div>
        <p className="m-4 max-w-sm text-center">
          If you have any questions or see any issues with your order, please
          contact us at our email address:
          <button className="text-orange underline">
            <a href="mailto:electriclarry@gmail.com"> HERE</a>
          </button>
        </p>
        <Link href="/" passHref>
          <button className="primary-button">Continue Shopping</button>
        </Link>
      </div>
    </>
  )
}

export type Order = {
  line_items: {
    data: {
      id: string
      name: string
      description: string
      amount_total: number
      currency: string
      quantity: number
    }[]
  }
  payment_intent: {
    id: string
    amount: number
    currency: string
    status: string
  }
  customer_details: {
    email: string
  }
  shipping_details: {
    name: string
    address: {
      line1: string
      line2: string
      city: string
      state: string
      postal_code: string
      country: string
    }
  }
  shipping_cost: {
    amount_total: number
  }
  amount_total: number
}
