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
    <div className="bg-transparent flex w-full flex-col items-center justify-center md:h-96">
      <h4 className="text-center text-4xl text-orange drop-shadow">
        Become a Larry!
      </h4>
      <p className="mx-2 mb-4 text-center drop-shadow md:text-sm lg:text-lg">
        Join the fan club and get semi-sorta-regular updates from our fearless
        leader about new products and stuff going on at the store.
      </p>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-transparent after:z-1 flex h-12 w-1/2 items-center justify-center text-orange outline-none transition-all after:absolute after:h-full after:w-full after:origin-right after:scale-x-0 after:bg-orange after:transition-all after:content-none hover:-translate-y-1 hover:border-2 hover:shadow-2xl hover:after:origin-left hover:after:scale-x-110"
      >
        <input
          className="bg-transparent h-full w-full max-w-7xl text-orange placeholder-orange outline-none"
          type="email"
          placeholder="I won't spam you, I promise."
          aria-label="Enter your email address"
          {...register("email", {
            required:
              "It's cool if you don't want be a Larry, just don't fill this out.",
          })}
        />
        <button
          className="bg-transparent w-fit flex-shrink cursor-pointer border-none p-2 text-orange transition-all duration-500 ease-in-out hover:bg-orange hover:text-Green md:text-lg"
          type="submit"
          aria-label="Submit"
        >
          <NewsletterIcon />
        </button>

        {errors.email && (
          <p className="text-center text-Red">{errors.email.message}</p>
        )}
      </form>
    </div>
  )
}

export default Newsletter
