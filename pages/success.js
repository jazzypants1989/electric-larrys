import Image from "next/image"
import Link from "next/link"
import Layout from "../components/Layout"

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

export default function Success({ order }) {
  console.log(order)
  return (
    <Layout title="Success">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={"/wow.webp"}
          alt="wow"
          width={400}
          height={250}
          layout="responsive"
          sizes="(max-width: 600px) 50vw, 600px"
        />
        <h1>Thank you for your order!</h1>
        <h2>Order &quot;Number&quot;: {order.payment_intent.id}</h2>
        <h2>A confirmation email has been sent to:</h2>
        <h3>{order.customer_details.email}</h3>
        <h4>Items Ordered:</h4>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          {order.line_items.data.map((item) => (
            <tr key={item.slug}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>${item.amount_total / 100}</td>
            </tr>
          ))}
          <tfoot>
            <tr>
              <td colSpan={3}>
                <strong>
                  Shipping: ${order.shipping_cost.amount_total / 100}
                </strong>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <strong>Total: ${order.amount_total / 100}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
        <div
          className="flex flex-col items-center justify-center w-full mt-4 space-y-4"
          style={{ maxWidth: "400px" }}
        >
          <p>The Shipping Address that you entered was:</p>
          <p>
            {order.shipping_details.address.line1} <br />
          </p>
          {order.shipping_details.address.line2 && (
            <p>
              {order.shipping_details.address.line2}
              <br />
            </p>
          )}
          <p>
            {order.shipping_details.address.city},{" "}
            {order.shipping_details.address.state}
          </p>
          <p>{order.shipping_details.address.postal_code}</p>
          <p>{order.shipping_details.address.country}</p>
        </div>
        <p>
          If you have any questions or see any issues with your order, please
          contact us at our email address:
          <button className="text-blue-500 underline">
            <a href="mailto:electriclarry@gmail.com"> HERE</a>
          </button>
        </p>
        <Link href="/" passHref>
          <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
            Continue Shopping
          </button>
        </Link>
      </div>
    </Layout>
  )
}
