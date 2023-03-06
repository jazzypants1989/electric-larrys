export const revalidate = 0

import Success from "./Success"

const stripe = require("stripe")(process.env.STRIPE_SECRET)

export default async function Page() {
  return <Success stripe={stripe} />
}
