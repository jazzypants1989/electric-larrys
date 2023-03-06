import Success from "./Success"

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET)

export default async function Page() {
  return <Success stripe={stripe} />
}
