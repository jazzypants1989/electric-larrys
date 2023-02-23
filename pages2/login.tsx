import Link from "next/link"
import React, { useEffect } from "react"
import { signIn, useSession, getProviders } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"
import Layout from "../components/Layout"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { FcGoogle } from "react-icons/fc"
import { RiDiscordFill } from "react-icons/ri"
import { AxiosError } from "axios"
import AuthContainer from "../components/Auth/AuthContainer"

type FormValues = {
  email: string
  password: string
}

export default function LoginScreen({
  providers,
}: {
  providers: Record<string, any>
}) {
  const { data: session } = useSession()

  const router = useRouter()
  const { redirect } = router.query

  useEffect(() => {
    if (session) {
      router.push("/")
    }
  }, [session, router])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>()

  const submitHandler: SubmitHandler<FormValues> = async ({
    email,
    password,
  }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })
      if (result?.error) {
        toast.error(result.error)
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else if (err instanceof AxiosError) {
        toast.error(err.response?.data.message)
      }
    }
  }
  return (
    <Layout title="Login">
      <AuthContainer>
        <form className="mx-auto w-1/2" onSubmit={handleSubmit(submitHandler)}>
          <h1 className="mb-4 text-center text-xl">Login</h1>
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
          <div className="mb-4 flex flex-col items-center justify-center text-base">
            Don&apos;t have an account? &nbsp; <hr></hr>
            <button className="default-button">
              <Link href={`/register?redirect=${redirect || "/"}`}>
                Register
              </Link>
            </button>
          </div>
        </form>

        <div className="mx-auto mb-5 flex w-fit transform items-center justify-center gap-2 rounded-3xl bg-Green px-4 pt-5 text-center transition-all duration-500 ease-in-out hover:scale-110 hover:bg-orange">
          <h1 className="mb-4 text-xl">Or:</h1>
          <div className="bg-transparent mb-4 flex">
            <button
              aria-label="Sign in with Google"
              onClick={() => signIn(providers.google.id)}
              className="transform transition-all duration-500 ease-in-out hover:scale-125"
            >
              <FcGoogle className="inline-block h-10 w-10" />
            </button>
          </div>
          <div className="mb-4">
            <button
              aria-label="Login with Discord"
              onClick={() => signIn(providers.discord.id)}
              className="transform transition-all duration-500 ease-in-out hover:scale-125"
            >
              <RiDiscordFill className="inline-block h-10 w-10" />
            </button>
          </div>
        </div>
      </AuthContainer>
    </Layout>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
