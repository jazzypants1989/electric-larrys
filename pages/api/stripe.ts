import Stripe from "stripe"
import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`, {
  apiVersion: "2022-11-15",
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const user = session?.user
  const stripeId = user
    ? user["http://localhost:3000/stripe_customer_id"]
    : undefined

  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        customer: stripeId,
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1000,
                currency: "usd",
              },
              display_name: "Standard Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 20,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 4000,
                currency: "usd",
              },
              display_name: "Express Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 5,
                },
              },
            },
          },
        ],
        allow_promotion_codes: true,
        line_items: req.body.cartItems.map(
          (item: {
            name: any
            image: any
            price: number
            price_data: {
              currency: string
              product_data: { name: any; images: any[] }
              unit_amount: number
            }
            quantity: any
          }) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [item.image],
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          })
        ),
        success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
      })
      res.status(200).json({ id: session.id })
    } catch (error) {
      if (error instanceof Stripe.errors.StripeError) {
        res.status(500).json({ statusCode: 500, message: error.message })
      } else {
        res.status(404).json({ statusCode: 404, message: "Not found" })
      }
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
