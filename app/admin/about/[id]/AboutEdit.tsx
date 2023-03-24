"use client"

import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import useToast from "../../../../utils/useToast"
import Button from "../../../../components/Layout/Button"

import type { About } from "@prisma/client"
import AdminGallery from "../../../../components/Admin/AdminGallery"

export default function AboutEdit({ about }: { about: About }) {
  const addToast = useToast()
  const [loading, setLoading] = useState(false)
  const [numberOfImages, setNumberOfImages] = useState(about.otherImages.length)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [gallery, setGallery] = useState("hero")
  const [currentlyActiveImage, setCurrentlyActiveImage] = useState(0)
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    id,
    title,
    heroImage,
    heroText,
    description,
    isPublished,
    otherImages,
  } = about

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<About>({
    defaultValues: {
      title,
      heroText,
      heroImage,
      otherImages,
      description,
      isPublished,
    },
  })

  const onSubmit: SubmitHandler<About> = async (data) => {
    setLoading(true)
    setError("")
    console.log(data)
    try {
      const res = await fetch(`/api/admin/about/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      addToast("About updated successfully", true)
      router.refresh()
      router.push("/admin/about")
    } catch (e) {
      console.error(e)
      addToast((e as Error).message, false)
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  function openGallery(id: number) {
    if (id !== -1) {
      setGallery("other")
    } else {
      setGallery("hero")
    }
    setCurrentlyActiveImage(id)
    setGalleryOpen(true)
  }

  function setHeroImage(image: string) {
    setValue("heroImage", image)
    setGalleryOpen(false)
  }

  function setOtherImage(image: string) {
    setValue(`otherImages.${currentlyActiveImage}`, image)
    setGalleryOpen(false)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold drop-shadow">Edit About</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="heroText">Hero Text</label>
          <textarea
            rows={5}
            cols={50}
            id="heroText"
            {...register("heroText", { required: true })}
          />
          {errors.heroText && (
            <p className="text-red-500">Hero Text is required</p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <label htmlFor="heroImage" className="mr-2">
            Hero Image
          </label>
          <input
            type="text"
            id="heroImage"
            {...register("heroImage", { required: true })}
          />
          {errors.heroImage && (
            <p className="text-red-500">Hero Image is required</p>
          )}
          <Button type="button" onClick={() => openGallery(-1)}>
            Open Gallery
          </Button>
          {gallery === "hero" && (
            <AdminGallery
              pictures={heroImage ? [heroImage] : []}
              setPicture={setHeroImage}
              show={galleryOpen}
              setShow={setGalleryOpen}
            />
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="otherImages">Other Images</label>
          {numberOfImages > 0 &&
            Array.from(Array(numberOfImages).keys()).map((i) => (
              <div key={i} className="flex items-center justify-center">
                <input
                  type="text"
                  id={`otherImages${i}`}
                  {...register(`otherImages.${i}`)}
                />
                <Button
                  type="button"
                  onClick={() => openGallery(i)}
                  className="w-1/2"
                >
                  Open Gallery
                </Button>
              </div>
            ))}
          <Button
            type="button"
            onClick={() => setNumberOfImages(numberOfImages + 1)}
          >
            Add Image
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (numberOfImages > 0) {
                setNumberOfImages(numberOfImages - 1)
                setValue(`otherImages.${numberOfImages - 1}`, "")
              }
            }}
          >
            Remove Image
          </Button>
          {gallery === "other" && (
            <AdminGallery
              pictures={otherImages}
              setPicture={setOtherImage}
              show={galleryOpen}
              setShow={setGalleryOpen}
            />
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={5}
            cols={50}
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="isPublished">Published</label>
          <input
            type="checkbox"
            id="isPublished"
            {...register("isPublished")}
          />
          <p className="text-red-500">{error}</p>
        </div>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white rounded py-2 px-4 font-bold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  )
}
