import Image from "next/image"
import Link from "next/link"
import Layout from "../components/Layout"
import { useContext, useEffect } from "react"
import { Store } from "../utils/Store"

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET)

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    { expand: ["line_items", "payment_intent"] }
  )
  return {
    props: {
      order,
    },
  }
}

// let order = {
//   line_items: {
//     data: [
//       {
//         id: "1",
//         name: "Test item number 1",
//         description:
//           "This is a really long description for a test item. I want to see what happens when the description goes on for multiple lines.",
//         amount_total: 1000,
//         currency: "usd",
//         quantity: 1,
//       },
//     ],
//   },
//   payment_intent: {
//     id: "1",
//     amount: 1000,
//     currency: "usd",
//     status: "succeeded",
//   },
//   customer_details: {
//     email: "jimmyjambles@jamblenet.com",
//   },
//   shipping_details: {
//     name: "Jimmy Jambles",
//     address: {
//       line1: "1234 Jamblenet Lane",
//       line2: "Apt. 1",
//       city: "Jamblenet",
//       state: "Jamblenet",
//       postal_code: "12345",
//       country: "Jamblenet",
//     },
//   },
//   shipping_cost: {
//     amount_total: 1000,
//   },
//   amount_total: 2000,
// }

export default function Success({ order }) {
  const { dispatch } = useContext(Store)

  useEffect(() => {
    dispatch({ type: "CART_RESET" })
  }, [dispatch])

  if (!order) {
    return (
      <Layout title="Order Failed">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center drop-shadow">
            Order Failed
          </h1>
          <p className="text-center">
            We were unable to process your order. This could be a bug, so wait
            five minutes and see if you get a confirmation e-mail from Stripe.
            If no confirmation email arrives, please try again. If the problem
            persists, please contact us at electriclarrys@gmail.com. <br />
            <Link href="/">Go back to the home page and try again.</Link>
          </p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Success">
      <div className="flex flex-col items-center space-around text-center">
        <h1 className="text-3xl font-bold text-center drop-shadow">
          Thank you for your order!
        </h1>
        <div>
          <Image src="/images/wow.webp" alt="wow" width={400} height={250} />
        </div>
        <h2 className="text-xl drop-shadow mt-4 underline">
          Order &quot;Number&quot;
        </h2>
        <span className="text-lg">{order.payment_intent.id}</span>

        <h2 className="text-xl drop-shadow mt-2 underline">
          Confirmation Email
        </h2>
        <span className="text-lg">{order.customer_details.email}</span>

        <h4 className="text-xl drop-shadow mt-2 underline">Items Ordered:</h4>
        <table className="table-auto border-2 border-orange mt-2">
          <thead className="bg-orange text-sm">
            <tr className="p-4">
              <th className="p-4">Item</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Price</th>
            </tr>
          </thead>
          {order.line_items.data.map((item) => (
            <tr key={item.slug} className="p-4">
              <td className="p-4 border-b border-orange ">{item.name}</td>
              <td className="p-4 border-b border-orange">{item.quantity}</td>
              <td className="p-4 border-b border-orange drop-shadow">
                ${item.amount_total / 100}
              </td>
            </tr>
          ))}
          <tfoot className="text-right">
            <tr>
              <td colSpan={3}>
                <strong className="text-sm drop-shadow p-2 mr-3">
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
                <strong className="text-sm drop-shadow p-2 mr-3 pb-0 border-b border-orange">
                  Shipping: ${order.shipping_cost.amount_total / 100}
                </strong>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <strong className="text-sm drop-shadow p-2 mr-3">
                  Total: ${order.amount_total / 100}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
        <div
          className="flex flex-col items-center justify-center w-full mt-4 space-y-4"
          style={{ maxWidth: "400px" }}
        >
          <h2 className="text-xl drop-shadow mt-2 underline">
            Shipping Address
          </h2>
          <div className="flex flex-col items-center justify-center w-full space-y-2 max-w-sm">
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
        <p className="m-4 text-center max-w-sm">
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
    </Layout>
  )
}
