import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"
import { CartItem } from "../../../utils/Store"

if (!process.env.STRIPE_SECRET) {
  throw new Error("Missing the STRIPE_SECRET environment variable.")
}

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error("Missing the NEXT_PUBLIC_BASE_URL environment variable.")
}

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2022-11-15",
})

export async function POST(req: NextRequest) {
  const data = await req.json()
  const cartItems = data.cartItems as CartItem[]

  function createLineItems() {
    return cartItems.map((item) => ({
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

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: createLineItems(),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_urL}/cart`,
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

    return new Response(JSON.stringify({ session }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    })
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      console.log(error)
      NextResponse.json({
        message: `${(error as Error).message}`,
      }),
        { status: 500 }
    } else {
      console.log(error)
      NextResponse.json({
        message: "Something went wrong",
      }),
        { status: 500 }
    }
  }
}
