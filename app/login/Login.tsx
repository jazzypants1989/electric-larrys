"use client"

import Link from "next/link"
import { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import Google from "../../components/Auth/Icons/Google"
import Discord from "../../components/Auth/Icons/Discord"
import Button from "../../components/Layout/Button"
import AuthContainer from "../../components/Auth/AuthContainer"
import useToast from "../../utils/useToast"

type FormValues = {
  email: string
  password: string
}

function LoginScreen({ providers }: { providers: Record<string, any> }) {
  const { data: session } = useSession()
  const addToast = useToast()

  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.refresh()
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
        redirect: true,
        email,
        password,
      })
      addToast("You have successfully logged in!", true)
      console.log(result)
    } catch (err) {
      console.log(err)
      addToast("Something went wrong, please try again.", false)
    }
  }
  return (
    <AuthContainer>
      <form
        className="mx-auto w-1/2 rounded-3xl bg-blue bg-opacity-50 p-5"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-center text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "We won't spam you with anything, we promise.",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "I don't think that's a real e-mail address, my guy.",
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
        <div className="mb-4 flex flex-col items-center justify-center text-base">
          <Button type="submit" className="mx-auto">
            Login
          </Button>
        </div>
        <div className="mb-4 flex flex-col items-center justify-center text-base">
          Don&apos;t have an account? &nbsp; <hr></hr>
          <Button onClick={() => router.push(`/register?redirect=${"/"}`)}>
            <Link href={`/register?redirect=${"/"}`}>Register</Link>
          </Button>
        </div>
      </form>

      <div className="mx-auto mb-5 flex w-fit transform items-center justify-center gap-2 rounded-3xl bg-Green px-4 pt-5 text-center text-orange transition-all duration-500 ease-in-out hover:scale-110 hover:bg-orange hover:text-Green">
        <h1 className="mb-4 text-xl">Or:</h1>
        <div className="bg-transparent mb-4 flex">
          <button
            aria-label="Sign in with Google"
            onClick={() => signIn(providers.google.id)}
            className="transition- transform duration-500 ease-in-out hover:scale-125"
          >
            <Google />
          </button>
        </div>
        <div className="mb-4">
          <button
            aria-label="Login with Discord"
            onClick={() => signIn(providers.discord.id)}
            className="transform transition-transform duration-500 ease-in-out hover:scale-125"
          >
            <Discord />
          </button>
        </div>
      </div>
    </AuthContainer>
  )
}

export default function Login({
  providers,
}: {
  providers: Record<string, any>
}) {
  return <LoginScreen providers={providers} />
}
