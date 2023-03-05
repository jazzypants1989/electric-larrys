"use client"

import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { useAtom } from "jotai"
import toastStore from "../../../../utils/ToastStore"
import { Post } from "@prisma/client"
import { useState } from "react"

const randomID = Math.random().toString(36).substring(2, 15)

export default function PostPage({ post }: { post: Post }) {
  const [, setToasts] = useAtom(toastStore)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const { id, title, link, description, image, isFeatured, isPublished } = post

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>({
    defaultValues: {
      title,
      link,
      description,
      image,
      isFeatured,
      isPublished,
    },
  })

  const onSubmit: SubmitHandler<Post> = async (data) => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
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
            message: "Post updated successfully",
            success: true,
          },
        ],
      }))
      router.push("/admin/posts")
    } catch (e) {
      console.error(e)
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-2 drop-shadow">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Edit Post</h1>
        <form
          className="mt-3 flex w-full max-w-2xl flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col items-center justify-center">
            <label htmlFor="title" className="text-xl">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full rounded-md border p-2"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-Red">This field is required</span>
            )}
          </div>
          <div className="mt-3 flex w-full flex-col items-center justify-center">
            <label htmlFor="description" className="text-xl">
              Description
            </label>
            <textarea
              id="description"
              className="w-full rounded-md border p-2"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-Red drop-shadow-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="mt-3 flex w-full flex-col items-center justify-center">
            <label htmlFor="link" className="text-xl">
              Link
            </label>
            <input
              id="link"
              type="text"
              className="w-full rounded-md border p-2"
              {...register("link")}
            />
            <span className="text-xs">Optional</span>
          </div>
          <div className="mt-3 flex w-full flex-col items-center justify-center">
            <label htmlFor="image" className="text-xl">
              Image
            </label>
            <input
              id="image"
              type="text"
              className="w-full rounded-md border p-2"
              {...register("image")}
            />
            <span className="text-xs">Optional</span>
          </div>
          <div className="mt-3 flex w-full flex-col items-center justify-center">
            <label htmlFor="isFeatured" className="text-xl">
              Featured
            </label>
            <input
              id="isFeatured"
              type="checkbox"
              className="w-full rounded-md border p-2"
              {...register("isFeatured")}
            />
          </div>
          <div className="mt-3 flex w-full flex-col items-center justify-center">
            <label htmlFor="isPublished" className="text-xl">
              Published
            </label>
            <input
              id="isPublished"
              type="checkbox"
              className="w-full rounded-md border p-2"
              {...register("isPublished")}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-500 mt-3 w-full rounded-md p-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "Update Post"}
          </button>
          {error && <span className="text-Red">{error}</span>}
        </form>
      </main>
    </div>
  )
}
