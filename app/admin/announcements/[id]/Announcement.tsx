"use client"

import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { useAtom } from "jotai"
import toastStore from "../../../../utils/ToastStore"
import { useState } from "react"
import type { Announcement } from "../Announcements"

const randomID = Math.random().toString(36).substring(2, 15)

export default function AnnouncementPage({
  announcement,
}: {
  announcement: Announcement
}) {
  const [, setToasts] = useAtom(toastStore)
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
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: "Announcement updated successfully",
            success: true,
          },
        ],
      }))
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
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: "Announcement deleted successfully",
            success: true,
          },
        ],
      }))
      router.push("/admin/announcements")
    } catch (e) {
      console.error(e)
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <h1 className="text-6xl font-bold">Announcement</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center"
      >
        <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <label htmlFor="title" className="text-2xl font-bold">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="border-gray-300 w-full rounded-md border p-2"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <label htmlFor="link" className="text-2xl font-bold">
            Link
          </label>
          <input
            id="link"
            type="text"
            className="border-gray-300 w-full rounded-md border p-2"
            {...register("link", { required: true })}
          />
          {errors.link && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <label htmlFor="description" className="text-2xl font-bold">
            Description
          </label>
          <textarea
            id="description"
            className="border-gray-300 w-full rounded-md border p-2"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <label htmlFor="isPublished" className="text-2xl font-bold">
            Published
          </label>
          <input
            id="isPublished"
            type="checkbox"
            className="border-gray-300 w-full rounded-md border p-2"
            {...register("isPublished", { required: true })}
          />
          {errors.isPublished && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 rounded-md p-2"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <button
            type="button"
            onClick={deleteHandler}
            disabled={loading}
            className="bg-red-500 rounded-md p-2"
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
      </form>
    </main>
  )
}
