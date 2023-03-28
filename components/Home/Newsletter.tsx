"use client"

import NewsletterIcon from "./Icons/Newsletter"
import { useForm, SubmitHandler } from "react-hook-form"
import useToast from "../../utils/useToast"

type FormValues = {
  email: string
}

const Newsletter = () => {
  const addToast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const submitHandler: SubmitHandler<FormValues> = async ({
    email,
  }: {
    email: string
  }) => {
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      const { message } = data
      addToast(message, true)
    } catch (err) {
      addToast("Error subscribing to newsletter", false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center md:h-96">
      <h4 className="text-center text-4xl text-orange drop-shadow">
        Become a Larry!
      </h4>
      <p className="mx-2 mb-4 text-center drop-shadow md:text-sm lg:text-lg">
        Join the fan club and get semi-sorta-regular updates from our fearless
        leader about new products and stuff going on at the store.
      </p>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex h-12 w-1/2 items-center justify-center text-orange outline-none transition-all md:w-1/3"
      >
        <input
          className="focus:border-transparent h-full w-full max-w-7xl text-orange placeholder-orange outline-none transition-all duration-500 ease-in-out hover:bg-orange hover:text-Yellow focus:outline-none focus:ring-2 focus:ring-orange focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-orange active:bg-orange active:text-Yellow md:text-lg"
          type="email"
          placeholder="I won't spam you, I promise."
          aria-label="Enter your email address"
          {...register("email", {
            required:
              "It's cool if you don't want be a Larry, just don't fill this out.",
          })}
        />
        <button
          className="focus:border-transparent w-fit flex-shrink cursor-pointer rounded-lg border-none bg-orange p-2 text-Yellow transition-all duration-500 ease-in-out hover:bg-Yellow hover:text-orange focus:outline-none focus:ring-2 focus:ring-orange focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-orange md:text-lg"
          type="submit"
          aria-label="Submit"
        >
          <NewsletterIcon />
        </button>

        {errors.email && (
          <p
            className="
          text-white absolute top-0 right-0 w-fit rounded-lg bg-Red p-1 text-center text-xs"
          >
            {errors.email.message}
          </p>
        )}
      </form>
    </div>
  )
}

export default Newsletter
