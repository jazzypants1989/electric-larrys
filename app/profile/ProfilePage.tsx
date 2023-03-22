"use client"

import { User } from "next-auth"
import Image from "next/image"
import Store from "../../utils/Store"
import { useAtom } from "jotai"
import { SubmitHandler, useForm } from "react-hook-form"
import { signOut } from "next-auth/react"
import useToast from "../../utils/useToast"
import { useRouter } from "next/navigation"
import Button from "../../components/Layout/Button"

export default function ProfilePage({
  orders,
  user,
}: {
  orders: Order[]
  user: User
}) {
  const [, setCart] = useAtom(Store)
  const addToast = useToast()
  const router = useRouter()

  type FormValues = {
    name: string
    email: string
    password: string
    confirmPassword: string
  }

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
    },
  })

  const submitHandler: SubmitHandler<FormValues> = async ({
    name,
    email,
    password,
  }: FormValues) => {
    try {
      const res = await fetch("/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await res.json()

      console.log(data)

      if (data.error) {
        addToast(data.error, false)
      } else {
        addToast("Profile updated successfully", true)
      }
    } catch (err) {
      addToast("Error updating profile", false)
    }
  }

  const logoutClickHandler = () => {
    setCart({
      cartItems: [],
      cartOpen: false,
    })

    signOut({ callbackUrl: "/login" })
  }

  const newsletterClickHandler = async () => {
    try {
      await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          newsletter: !user.newsletter,
        }),
      })

      addToast(
        "Newsletter updated successfully. We have to log you out to refresh the cookie. Sorry!",
        true
      )
      signOut({ callbackUrl: "/login" })
      router.push("/login")
    } catch (err) {
      addToast("Error updating newsletter", false)
    }
  }

  if (!user) {
    return (
      <div className="flex-col items-center justify-center">
        <h1 className="text-center text-3xl drop-shadow">Profile</h1>
        <h2 className="text-center text-lg drop-shadow">User</h2>
        <h3 className="text-center drop-shadow">Not logged in</h3>
        <p className="text-center drop-shadow">
          Please log in to view your profile
        </p>
      </div>
    )
  }

  return (
    <div className="flex-col items-center justify-center">
      <h1 className="text-center text-3xl drop-shadow">Profile</h1>
      <h2 className="text-center text-lg drop-shadow">User</h2>
      <h3 className="text-center drop-shadow">{user.name}</h3>
      <p className="text-center drop-shadow">{user.email}</p>
      {user.image && user.image !== "f" && (
        <div className="relative left-4 mx-auto mt-4 h-32 w-32">
          <Image
            src={user.image}
            alt="User Image"
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
        <h1 className="mb-4 text-xl">Change Password</h1>

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
        <Button type="submit" className="mb-4">
          Change Password
        </Button>
      </form>
      <div className="flex flex-col items-center justify-center">
        <Button className="mt-4" onClick={newsletterClickHandler}>
          {user.newsletter ? "Unsubscribe" : "Subscribe"} to Newsletter
        </Button>
        <Button className="mt-4" onClick={logoutClickHandler}>
          Logout
        </Button>
      </div>
      <h2 className="text-center text-lg drop-shadow">Orders</h2>
      <ul className="flex flex-col items-center justify-center">
        {orders.map((order: Order) => (
          <div
            className="border-black border-b-3 border-r-3 border-l-3 border-t-3 m-2 flex w-full flex-col items-center justify-center gap-2 rounded-md border-4 p-2 shadow-md transition duration-500 ease-in-out hover:scale-105 hover:border-orange hover:bg-Green hover:text-blue hover:underline-offset-2"
            key={order.id}
          >
            <p className="border-b-4 border-l-4 border-orange p-2">
              <span className="text-sm underline">Order ID:</span> {order.id}
            </p>
            <p className="border-b-4 border-r-4 border-orange p-2">
              <span className="text-sm underline">Order Total:</span> $
              {(order.amount / 100).toFixed(2)}
            </p>
            <p className="border-b-4 border-l-4 border-orange p-2">
              <span className="text-sm underline">Order Date</span>{" "}
              {new Date(order.created * 1000).toLocaleString()}
            </p>
            <p className="border-b-4 border-r-4 border-orange p-2">
              <span className="text-sm underline">Order Status:</span>
              {order.status}
            </p>
            <div className="border-b-4 border-l-4 border-orange p-2 text-center">
              <span className="text-sm underline">Shipping Address:</span>
              <div>
                {order.shipping.address.line1}, <br />
                {order.shipping.address.city}, {order.shipping.address.state},
                <br />
                {order.shipping.address.postal_code}
              </div>
            </div>
            {order.shipping.tracking_number ? (
              <p className="border-b-4 border-r-4 border-orange p-2">
                <span className="text-sm underline">Tracking Number:</span>
                {order.shipping.tracking_number}
              </p>
            ) : (
              <p className="border-b-4 border-r-4 border-orange p-2">
                <span className="text-sm underline">Tracking Number:</span> Not
                Available Yet
              </p>
            )}
          </div>
        ))}

        <h3>
          {" "}
          You&apos;ve spent:{" "}
          <span className="p-1 text-sm drop-shadow">
            $
            {orders.reduce((acc, order) => {
              return acc + order.amount
            }, 0) / 100}
          </span>
          over <span className="pl-1 text-sm drop-shadow">{orders.length}</span>{" "}
          orders. We hope you&apos;ve enjoyed us because we&apos;ve enjoyed you!
        </h3>

        <Button type="button" onClick={logoutClickHandler}>
          Log Out
        </Button>
      </ul>
    </div>
  )
}

type Order = {
  id: string
  amount: number
  created: number
  status: string
  shipping: {
    address: {
      line1: string
      city: string
      state: string
      postal_code: string
    }
    tracking_number: string
  }
}
