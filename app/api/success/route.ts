import Stripe from "stripe"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  if (!process.env.STRIPE_SECRET) {
    throw new Error("Missing the STRIPE_SECRET environment variable.")
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  })

  const session_id = req.nextUrl.searchParams.get("session_id")

  if (session_id === null || session_id === undefined) {
    return new Response("No session_id found", { status: 400 })
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: [
      "line_items",
      "payment_intent",
      "customer_details",
      "shipping_details",
    ],
  })

  if (session.line_items === null || session.line_items === undefined) {
    return new Response("No line items found", { status: 400 })
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

  console.log(order)

  return new Response(JSON.stringify(order), {
    headers: { "content-type": "application/json" },
  })
}
