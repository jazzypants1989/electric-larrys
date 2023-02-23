import { RiBallPenFill } from "react-icons/ri"
import { toast } from "react-toastify"
import axios, { AxiosError } from "axios"
import { useForm, SubmitHandler } from "react-hook-form"

type FormValues = {
  email: string
}

const Newsletter = () => {
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
      await axios.post("/api/newsletter", { email })
      toast.success(
        "Thanks for signing up! Maybe I'll get around to sending you an email one day."
      )
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message)
      } else {
        if (err instanceof Error) {
          toast.error(err.message)
        }
      }
    }
  }

  return (
    <div className="md:h-96 w-full flex flex-col justify-center items-center bg-transparent">
      <h4 className="text-4xl drop-shadow text-center text-orange">
        Become a Larry!
      </h4>
      <p className="text-center drop-shadow md:text-sm lg:text-lg mb-4">
        Join the fan club and get semi-sorta-regular updates from our fearless
        leader about new products and stuff going on at the store.
      </p>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-1/2 h-12 bg-transparent flex justify-center items-center text-orange transition-all outline-none hover:border-2 hover:shadow-2xl hover:-translate-y-1 hover:after:scale-x-110 hover:after:origin-left after:content-none after:absolute after:w-full after:h-full after:z-1 after:bg-orange after:scale-x-0 after:origin-right after:transition-all"
      >
        <input
          className="w-full h-full bg-transparent text-orange outline-none placeholder-orange"
          type="email"
          placeholder="I won't spam you, I promise."
          aria-label="Enter your email address"
          {...register("email", {
            required:
              "It's cool if you don't want be a Larry, just don't fill this out.",
          })}
        />
        <button
          className="flex-shrink w-fit p-2 border-none bg-transparent text-orange hover:text-Green md:text-lg cursor-pointer"
          type="submit"
          aria-label="Submit"
        >
          <RiBallPenFill className="text-2xl" />
        </button>

        {errors.email && (
          <p className="text-Red text-center">{errors.email.message}</p>
        )}
      </form>
    </div>
  )
}

export default Newsletter
