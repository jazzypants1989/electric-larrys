"use client"

import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import type { Announcement } from "../Announcements"
import useToast from "../../../../utils/useToast"
import Button from "../../../../components/Layout/Button"

export default function AnnouncementPage({
  announcement,
}: {
  announcement: Announcement
}) {
  const addToast = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const { id, title, link, description, isPublished } = announcement

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Announcement>({
    defaultValues: {
      title,
      link,
      description,
      isPublished,
    },
  })

  const onSubmit: SubmitHandler<Announcement> = async (data) => {
    setLoading(true)
    setError("")

    console.log(data)

    try {
      const res = await fetch(`/api/admin/announcements/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      addToast("Announcement updated successfully", true)
      router.refresh()
      router.push("/admin/announcements")
    } catch (e) {
      console.error(e)
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const deleteHandler = async () => {
    if (!window.confirm("Delete announcement?")) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/admin/announcements/${id}`, {
        method: "DELETE",
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      addToast("Announcement deleted successfully", true)
      router.refresh()
      router.push("/admin/announcements")
    } catch (e) {
      console.error(e)
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex w-full flex-col items-center justify-center px-20 text-center">
      <h1 className="text-3xl font-bold">Announcement: {title}</h1>
      {error && <p className="text-Red">{error}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center px-20 text-center"
      >
        <div className="flex w-full flex-col items-center justify-center px-20 text-center">
          <label htmlFor="title" className="text-2xl font-bold">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full rounded-md border border-orange p-2"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-Red">This field is required</span>
          )}
        </div>
        <div className="flex w-full flex-col items-center justify-center px-20 text-center">
          <label htmlFor="link" className="text-2xl font-bold">
            Link
          </label>
          <input
            id="link"
            type="text"
            className="w-full rounded-md border border-orange p-2"
            {...register("link")}
          />
          <span className="text-Red">
            Make sure you put &quot;https://&quot; if it&apos;s an outside link
            or it won&apos;t work!
          </span>
        </div>
        <div className="flex w-full flex-col items-center justify-center px-20 text-center">
          <label htmlFor="description" className="text-2xl font-bold">
            Description
          </label>
          <textarea
            id="description"
            className="w-full rounded-md border border-orange p-2"
            {...register("description")}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center px-20 text-center">
          <label htmlFor="isPublished" className="text-2xl font-bold">
            Published
          </label>
          <input
            id="isPublished"
            type="checkbox"
            className="m-2 h-10 w-10 rounded-md border border-orange"
            {...register("isPublished")}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4 px-20 text-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Update"}
          </Button>
          <Button
            type="button"
            onClick={deleteHandler}
            disabled={loading}
            className="rounded-md bg-Red p-2"
          >
            {loading ? "Loading..." : "Delete"}
          </Button>
        </div>
      </form>
    </main>
  )
}
