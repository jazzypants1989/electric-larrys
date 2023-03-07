import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next"
import { CartItem } from "../../utils/Store"

if (!process.env.STRIPE_SECRET) {
  throw new Error("Missing the STRIPE_SECRET environment variable.")
}

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2022-11-15",
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const checkout_session_id = req.query.session_id as string

  function createLineItems() {
    return req.body.cartItems.map((item: CartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          images: [item.product.image],
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    }))
  }

  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: createLineItems(),
        success_url: `https://electric-larrys.vercel.app/success?session_id=${checkout_session_id}`,
        cancel_url: "https://electric-larrys.vercel.app/cart",
        submit_type: "pay",
        mode: "payment",
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
      })

      res.status(200).json({ id: session.id })
    } catch (error) {
      if (error instanceof Stripe.errors.StripeError) {
        res.status(500).json({
          statusCode: 500,
          message: `${(error as Error).message}`,
          hatred: true,
        })
      } else {
        res.status(404).json({ statusCode: 404, message: "Not found" })
      }
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
