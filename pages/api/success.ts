import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.STRIPE_SECRET) {
    throw new Error("Missing the STRIPE_SECRET environment variable.")
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  })

  const session = await stripe.checkout.sessions.retrieve(
    req.query.session_id as string,
    {
      expand: [
        "line_items",
        "payment_intent",
        "customer_details",
        "shipping_details",
      ],
    }
  )

  if (session.line_items === null || session.line_items === undefined) {
    res.status(400).json({ error: "No line items found" })
    return
  }

  const line_items = session.line_items
  const payment_intent = session.payment_intent
  const customer_details = session.customer_details
  const shipping_details = session.shipping_details
  const shipping_cost = session.shipping_cost
  const amount_total = session.amount_total

  const order = {
    line_items,
    payment_intent,
    customer_details,
    shipping_details,
    shipping_cost,
    amount_total,
  }

  res.status(200).json(order)
}
