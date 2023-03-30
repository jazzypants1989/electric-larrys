"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

import useToast from "../../../../utils/useToast"

import type { User } from "@/types"

export default function UserPage({ user }: { user: User }) {
  const addToast = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const { id, name, email, isAdmin, isEmployee, newsletter } = user!

  type FormValues = {
    name: string | null
    email: string | null
    isAdmin: boolean | null
    isEmployee: boolean | null
    newsletter: boolean | null
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name,
      email,
      isAdmin,
      isEmployee,
      newsletter,
    },
  })

  //@ts-ignore

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      addToast("User updated successfully", true)
      router.refresh()
      router.push("/admin/users")
    } catch (error) {
      console.error(error)
      setError((error as Error).message), setLoading(false)
      addToast((error as Error).message, false)
    }
  }

  return (
    <div className="sm:px-6 flex w-full flex-col justify-center py-12 lg:px-8">
      {error && (
        <div
          className="relative rounded border border-Black bg-Red px-4 py-3 text-Green"
          role="alert"
        >
          <span className="sm:inline block">{error}</span>
        </div>
      )}
      <div className="mx-auto w-full max-w-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Edit User
          </h2>
          <p className="mt-2 text-center text-sm text-Black">
            (Until they change their password on the profile page, each new
            user&apos;s password will be &quot;jellybeans&quot; because I&apos;m
            cheeky. That&apos;s all lowercase. Don&apos;t believe your eyes.)
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
        >
          <div className="space-y-4 rounded-md shadow-sm">
            <div
              className={`${
                errors.name ? "border-Red" : "border-Green"
              } relative rounded-t-md`}
            >
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="sm:text-sm relative block w-full appearance-none rounded-none rounded-t-md border border-Green px-3 py-2 text-Black placeholder-orange focus:z-10 focus:border-orange focus:outline-none focus:ring-orange"
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-xs italic text-Red">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="sm:text-sm relative block w-full appearance-none rounded-none rounded-t-md border border-Green px-3 py-2 text-Black placeholder-orange focus:z-10 focus:border-orange focus:outline-none focus:ring-orange"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="text-xs italic text-Red">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mx-auto my-2 flex flex-col items-center justify-center gap-2 py-2">
              <div className="flex flex-row items-center justify-center rounded-md border border-Green p-2">
                <label htmlFor="isAdmin" className="sr-only">
                  Is Admin
                </label>
                <input
                  {...register("isAdmin")}
                  id="isAdmin"
                  name="isAdmin"
                  type="checkbox"
                  autoComplete="isAdmin"
                  className="m-2 h-5 w-5 p-2"
                />
                <label htmlFor="isAdmin">Is Admin</label>
              </div>
              <div className="flex flex-row items-center justify-center rounded-md border border-Green p-2">
                <label htmlFor="isEmployee" className="sr-only">
                  Is Employee
                </label>
                <input
                  {...register("isEmployee")}
                  id="isEmployee"
                  name="isEmployee"
                  type="checkbox"
                  autoComplete="isEmployee"
                  className="m-2 h-5 w-5 p-2"
                />
                <label htmlFor="isEmployee">Is Employee</label>
              </div>
              <div className="flex flex-row items-center justify-center rounded-md border border-Green p-2">
                <label htmlFor="newsletter" className="sr-only">
                  Newsletter
                </label>
                <input
                  {...register("newsletter")}
                  id="newsletter"
                  name="newsletter"
                  type="checkbox"
                  autoComplete="newsletter"
                  className="m-2 h-5 w-5 p-2"
                />
                <label htmlFor="newsletter">Newsletter</label>
              </div>
            </div>
          </div>
        </form>
        <div>
          <button
            type="submit"
            className="border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 group relative flex w-full justify-center rounded-md border py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? (
              <svg
                className="text-white -ml-1 mr-3 h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
