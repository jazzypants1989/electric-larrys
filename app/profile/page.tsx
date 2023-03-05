import Link from "next/link"
import { getCurrentUser } from "../../utils/session"
import ProfilePage from "./ProfilePage"

const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`)

export default async function Profile() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <>
        <h1 className="my-10 text-center text-3xl font-bold drop-shadow">
          You are not logged in
        </h1>
        <div className="flex flex-col items-center justify-center text-center text-lg drop-shadow">
          <Link href="/login">Go to login page</Link>
        </div>
      </>
    )
  }

  const stripeId =
    user[`${process.env.NEXT_PUBLIC_BASE_URL}/stripe_customer_id`]
  const paymentIntents = await stripe.paymentIntents.list({
    customer: stripeId,
  })

  const orders = paymentIntents.data

  return <ProfilePage orders={orders} user={user} />
}
