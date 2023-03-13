"use client"

import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import useToast from "../../../../utils/useToast"
import { useState } from "react"
import AdminGallery from "../../../../components/Admin/AdminGallery"
import Button from "../../../../components/Layout/Button"

export type Post = {
  id: string | null
  title: string | null
  link: string | null
  description: string | null
  image: string | null
  isFeatured: boolean | null
  isPublished: boolean | null
}

export default function PostPage({
  post,
  pictures,
}: {
  post: Post
  pictures: string[]
}) {
  const addToast = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [show, setShow] = useState(false)
  const [picture, setPicture] = useState("")
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
      addToast("Post updated successfully", true)
      router.refresh()
      router.push("/admin/posts")
    } catch (e) {
      console.error(e)
      setError((e as Error).message)
      addToast((e as Error).message, false)
    } finally {
      setLoading(false)
    }
  }

  const modalButtonHandler = () => {
    setShow(!show)
  }

  const imageValueHandler = (picture: string) => {
    setPicture(picture)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-2 drop-shadow">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold">Edit Post</h1>
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
            <span className="text-xs">Optional</span>
            <input
              id="link"
              type="text"
              className="w-full rounded-md border p-2"
              {...register("link")}
            />
          </div>
          <div className="mt-3 flex w-full flex-col items-center justify-center">
            <label htmlFor="image" className="text-xl">
              Image
            </label>
            <span className="text-xs">Optional</span>
            <input
              id="image"
              type="text"
              className="w-full rounded-md border p-2"
              {...register("image")}
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
            <Button className="mt-3" onClick={modalButtonHandler}>
              Pick from gallery!
            </Button>
            <AdminGallery
              show={show}
              setPicture={imageValueHandler}
              setShow={setShow}
              pictures={pictures}
            />
          </div>
          <div className="m-3 flex w-full flex-col items-center justify-center p-2">
            <label htmlFor="isFeatured" className="text-xl">
              Featured
            </label>
            <input
              id="isFeatured"
              type="checkbox"
              className="mb-3 h-8 w-8 rounded-md border p-2 drop-shadow"
              {...register("isFeatured")}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <label htmlFor="isPublished" className="text-xl">
              Published
            </label>
            <input
              id="isPublished"
              type="checkbox"
              className="mb-3 h-8 w-8 rounded-md border p-2 drop-shadow"
              {...register("isPublished")}
            />
          </div>
          <Button type="submit" className="mt-3" disabled={loading}>
            {loading ? "Loading..." : "Update Post"}
          </Button>
          {error && <span className="text-Red">{error}</span>}
        </form>
      </main>
    </div>
  )
}
