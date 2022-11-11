import { useRouter } from "next/router"
import Image from "next/image"
import { getSession, signIn } from "next-auth/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { getError } from "../utils/error"
import axios from "axios"
import Layout from "../components/Layout"

export function ProfilePage({ user, orders }) {
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("name", user.name)
    setValue("email", user.email)
  }, [user, setValue])

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put("/api/auth/update", {
        name,
        email,
        password,
      })
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })
      toast.success("Profile updated successfully")
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }

  return (
    <Layout title="Profile">
      <div className="flex-col items-center justify-center">
        <h1 className="text-3xl drop-shadow text-center">Profile</h1>
        <h2 className="text-lg drop-shadow text-center">User</h2>
        <h3 className="drop-shadow text-center">{user.name}</h3>
        <p className="text-center drop-shadow">{user.email}</p>
        {user.image && user.image !== "f" && (
          <div className="w-32 h-32 mx-auto mt-4 relative left-4">
            <Image
              src={user.image}
              alt={user.name}
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
        )}
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">Update Profile</h1>

          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="w-full"
              id="name"
              autoFocus
              {...register("name", {
                required: "Please enter name",
              })}
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="w-full"
              id="email"
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              })}
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="w-full"
              type="password"
              id="password"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "password is more than 5 chars",
                },
              })}
            />
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="w-full"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 6,
                  message: "confirm password is more than 5 chars",
                },
              })}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 ">
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <div className="text-red-500 ">Password do not match</div>
              )}
          </div>
          <div className="mb-4">
            <button className="primary-button">Update Profile</button>
          </div>
        </form>
        <h2 className="text-lg drop-shadow text-center">Orders</h2>
        <ul className="flex flex-col items-center justify-center">
          {orders.map((order) => (
            <div
              className="w-full flex flex-col items-center justify-center gap-2 border-4 border-black border-b-3 border-r-3 border-l-3 border-t-3 rounded-md shadow-md m-2 p-2 hover:bg-Green hover:text-blue hover:border-orange hover:underline-offset-2 hover:scale-105 transition duration-500 ease-in-out"
              key={order.id}
            >
              <p className="border-b-4 border-l-4 border-orange p-2">
                <span className="underline text-sm">Order ID:</span> {order.id}
              </p>
              <p className="border-b-4 border-orange border-r-4 p-2">
                <span className="underline text-sm">Order Total:</span> $
                {(order.amount / 100).toFixed(2)}
              </p>
              <p className="border-b-4 border-l-4 p-2 border-orange">
                <span className="underline text-sm">Order Date</span>{" "}
                {new Date(order.created * 1000).toLocaleString()}
              </p>
              <p className="border-b-4 border-r-4 p-2 border-orange">
                <span className="underline text-sm">Order Status:</span>
                {order.status}
              </p>
              <p className="border-b-4 border-l-4 border-orange p-2 text-center">
                <span className="underline text-sm">Shipping Address:</span>
                <div>
                  {order.shipping.address.line1}, <br />
                  {order.shipping.address.city}, {order.shipping.address.state},
                  <br />
                  {order.shipping.address.postal_code}
                </div>
              </p>
              {order.shipping.tracking_number ? (
                <p className="border-b-4 border-r-4 p-2 border-orange">
                  <span className="underline text-sm">Tracking Number:</span>
                  {order.shipping.tracking_number}
                </p>
              ) : (
                <p className="border-b-4 border-r-4 p-2 border-orange">
                  <span className="underline text-sm">Tracking Number:</span>{" "}
                  Not Available Yet
                </p>
              )}
            </div>
          ))}

          <h3>
            {" "}
            You&apos;ve spent:{" $"}
            {orders.reduce((acc, order) => {
              return acc + order.amount
            }, 0) / 100}{" "}
            over {orders.length} orders. We hope you&apos;ve enjoyed us because
            we&apos;ve enjoyed you!
          </h3>

          <button type="button" onClick={() => router.push("/api/auth/logout")}>
            Log Out
          </button>
        </ul>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`)
  const session = await getSession(context)
  const user = session?.user
  const stripeId =
    user[`${process.env.NEXT_PUBLIC_BASE_URL}/stripe_customer_id`]
  const paymentIntents = await stripe.paymentIntents.list({
    customer: stripeId,
  })
  const orders = paymentIntents.data
  console.log(orders)
  return {
    props: {
      user,
      orders,
    },
  }
}

ProfilePage.auth = true
export default ProfilePage
