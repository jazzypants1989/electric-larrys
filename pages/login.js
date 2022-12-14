import Link from "next/link"
import React, { useEffect } from "react"
import { signIn, useSession, getProviders } from "next-auth/react"
import { useForm } from "react-hook-form"
import Layout from "../components/Layout"
import { getError } from "../utils/error"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { FcGoogle } from "react-icons/fc"
import { RiDiscordFill } from "react-icons/ri"

export default function LoginScreen({ providers }) {
  const { data: session } = useSession()

  const router = useRouter()
  const { redirect } = router.query

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/")
    }
  }, [router, session, redirect])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }
  return (
    <Layout title="Login">
      <div className="bg1 max-w-screen">
        <form className="mx-auto w-1/2" onSubmit={handleSubmit(submitHandler)}>
          <h1 className="mb-4 text-xl text-center">Login</h1>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "We won't spam you with anything, we promise.",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message:
                    "I don't think that's a real e-mail address, my guy.",
                },
              })}
              className="w-full"
              id="email"
              autoFocus
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
                required: "C'mon, you know you need a password, homie.",
                minLength: {
                  value: 8,
                  message:
                    "Password must be at least 8 characters. You don't want to get hacked, do you?",
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
          <div className="mb-4 ">
            <button className="primary-button">Login</button>
          </div>
          <div className="mb-4 text-base flex flex-col items-center justify-center">
            Don&apos;t have an account? &nbsp; <hr></hr>
            <button className="default-button">
              <Link href={`/register?redirect=${redirect || "/"}`}>
                Register
              </Link>
            </button>
          </div>
        </form>

        <div className="mx-auto mb-5 pt-5 px-4 w-fit bg-Green hover:bg-orange rounded-3xl flex justify-center items-center text-center gap-2 transition-all duration-500 ease-in-out transform hover:scale-110">
          <h1 className="mb-4 text-xl">Or:</h1>
          <div className="mb-4 flex bg-transparent">
            <button
              aria-label="Sign in with Google"
              onClick={() => signIn(providers.google.id)}
              className="transition-all duration-500 ease-in-out transform hover:scale-125"
            >
              <FcGoogle className="inline-block h-10 w-10" />
            </button>
          </div>
          <div className="mb-4">
            <button
              aria-label="Login with Discord"
              onClick={() => signIn(providers.discord.id)}
              className="transition-all duration-500 ease-in-out transform hover:scale-125"
            >
              <RiDiscordFill className="inline-block h-10 w-10" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
