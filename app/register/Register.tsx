"use client"

import Link from "next/link"
import { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import AuthContainer from "../../components/Auth/AuthContainer"

type FormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  newsletter: boolean
}

export default function RegisterScreen() {
  const { data: session } = useSession()

  const router = useRouter()

  type FormFetch = {
    name: string
    email: string
    password: string
    newsletter: boolean
  }

  const formFetch = async (data: FormFetch) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (!res.ok) throw Error(json.message)

    console.log(json)
  }

  useEffect(() => {
    if (session) {
      router.push("/")
    }
  }, [session, router])

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<FormValues>()

  const submitHandler: SubmitHandler<FormValues> = async ({
    name,
    email,
    password,
    newsletter,
  }: FormValues) => {
    try {
      await formFetch({
        name,
        email,
        password,
        newsletter,
      })

      const result = await signIn("credentials", {
        redirect: true,
        email,
        password,
      })

      if (result?.error) {
        throw new Error(result.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContainer>
      <div className="bg1 flex w-full flex-col items-center justify-center">
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">Create Account</h1>
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
              <div className="text-Red">{errors.name.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              })}
              className="w-full"
              id="email"
            ></input>
            {errors.email && (
              <div className="text-Red">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Please enter password",
                minLength: {
                  value: 6,
                  message: "password is more than 5 chars",
                },
              })}
              className="w-full"
              id="password"
              autoFocus
            ></input>
            {errors.password && (
              <div className="text-Red ">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="w-full"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please enter confirm password",
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 6,
                  message: "confirm password is more than 5 chars",
                },
              })}
            />
            {errors.confirmPassword && (
              <div className="text-Red ">{errors.confirmPassword.message}</div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <div className="text-Red ">Password do not match</div>
              )}
            <label htmlFor="newsletter">
              <input
                type="checkbox"
                id="newsletter"
                className="mr-2"
                {...register("newsletter")}
              />
              <span
                className="
              text-sm
              "
              >
                Subscribe to newsletter
              </span>
            </label>
          </div>

          <div className="mb-4 ">
            <button className="primary-button">Register</button>
          </div>
          <div className="mb-4 text-sm">
            Already have an account?
            <Link
              href={`/login`}
              className="primary-button block w-fit text-Black"
            >
              {" "}
              Log-on-in!
            </Link>
          </div>
        </form>
      </div>
    </AuthContainer>
  )
}