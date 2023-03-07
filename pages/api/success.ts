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
      expand: ["line_items", "payment_intent"],
    }
  )

  if (session.line_items === null || session.line_items === undefined) {
    res.status(400).json({ error: "No line items found" })
    return
  }

  const line_items = session.line_items.data
  const payment_intent = session.payment_intent

  const order = {
    line_items,
    payment_intent,
  }

  res.status(200).json(order)
}
