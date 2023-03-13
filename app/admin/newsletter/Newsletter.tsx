"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { User } from "../../../utils/dataHooks/getUserByID"
import useToast from "../../../utils/useToast"
import Button from "../../../components/Layout/Button"

type FormValues = {
  user: string
  subject: string
  message: string
  link: string
  image: string
}

export default function Newsletter({ users }: { users: User[] }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const addToast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true)
      setError("")
      const { user, subject, message, link, image } = data
      // Send email
      const mail = {
        user: user,
        subject: subject,
        message: message,
        link: link,
        image: image,
      }
      fetch("/api/admin/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mail),
      })
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
        <h1 className="text-3xl font-bold">Send newsletter</h1>
        <p>
          Send newsletter to all users who have subscribed to the newsletter
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="user">User</label>
            <select
              {...register("user", { required: true })}
              className="rounded-md border border-orange p-2"
              multiple
              size={users.length}
              style={{ height: "auto" }}
            >
              {users.map((user: User) => (
                <option key={user!.id}>{user!.email}</option>
              ))}
            </select>
            {errors.user && <p className="text-Red">This field is required</p>}
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
            {loading ? <p>Loading...</p> : <Button type="submit">Send</Button>}
          </div>
        </form>
      </div>
    </div>
  )
}
