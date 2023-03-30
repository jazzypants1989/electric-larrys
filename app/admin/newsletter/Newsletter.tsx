"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import useToast from "../../../utils/useToast"
import Button from "../../../components/Layout/Button"

import type { User } from "@/types"

type FormValues = {
  users: User[] | "ALL"
  subject: string
  message: string
  link: string
  image: string
}

export default function Newsletter({ users }: { users: User[] }) {
  const [type, setType] = useState("ALL")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const addToast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      users: "ALL",
      subject: "",
      message: "",
      link: "",
      image: "",
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true)
      setError("")
      const { users, subject, message, link, image } = data
      // Send email
      const mail = {
        users: users,
        subject: subject,
        message: message,
        link: link,
        image: image,
      }
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mail),
      })
      if (!res.ok) {
        throw new Error("Error sending newsletter")
      }
      const json = await res.json()
      console.log(json)
      setLoading(false)
      addToast("Newsletter sent successfully", true)
    } catch (error) {
      setLoading(false)
      setError((error as Error).message)
      addToast("Error sending newsletter", false)
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-orange drop-shadow">
          Send newsletter
        </h1>
        {type === "ALL" ? (
          <>
            <h2>Current Mode: Send to all Users that are signed up.</h2>
            <Button onClick={() => setType("SELECT")} className="mt-4 mb-4">
              Select users
            </Button>
          </>
        ) : (
          <>
            <h2>Current Mode: Select Users</h2>
            <Button
              onClick={() => {
                setType("ALL")
                setValue("users", "ALL")
              }}
              className="mt-4 mb-4"
            >
              Send to all users
            </Button>
          </>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center">
            {type === "ALL" ? (
              <input
                {...register("users")}
                type="hidden"
                defaultValue="ALL"
                value="ALL"
              />
            ) : (
              <>
                <label htmlFor="user">
                  Users -- hold CTRL or SHIFT to select multiple
                </label>
                <select
                  {...register("users", { required: true })}
                  className="rounded-md border border-orange p-2"
                  multiple
                  size={users.length}
                >
                  {users.map((user: User) => (
                    <option value={JSON.stringify(user)} key={user!.id}>
                      {user!.email}
                    </option>
                  ))}
                </select>
                {errors.users && (
                  <p className="text-Red">This field is required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="subject">Subject</label>
            <input
              {...register("subject", { required: true })}
              className="rounded-md border border-orange p-2"
            />
            {errors.subject && (
              <p className="text-Red">This field is required</p>
            )}
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <label htmlFor="message">Message</label>
            <textarea
              {...register("message", { required: true })}
              cols={30}
              rows={10}
              className="rounded-md border border-orange p-2"
            />
            {errors.message && (
              <p className="text-Red">This field is required</p>
            )}
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="link">Link</label>
            <input
              {...register("link", { required: true })}
              className="rounded-md border border-orange p-2"
            />
            {errors.link && <p className="text-Red">This field is required</p>}
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="image">Image</label>
            <input
              {...register("image", { required: true })}
              className="rounded-md border border-orange p-2"
            />
            {errors.image && <p className="text-Red">This field is required</p>}
          </div>
          <div className="mt-4 mb-4 flex flex-col items-center justify-center">
            {error && <p className="text-Red">{error}</p>}
            {loading ? (
              <>
                <h3
                  className="animate-pulse text-2xl font-bold"
                  style={{ color: "#FFA500" }}
                >
                  Sending...
                </h3>
                <p className="animate-bounce text-2xl font-bold">
                  This may take a while, because I schedule a one second delay
                  for each email... This is to keep you off the spam list.
                </p>
              </>
            ) : (
              <Button type="submit">Send</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
