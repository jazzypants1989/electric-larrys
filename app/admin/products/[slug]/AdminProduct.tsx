"use client"

import { ChangeEvent, useEffect, useReducer } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

import useToast from "../../../../utils/useToast"
import Button from "../../../../components/Layout/Button"
import TagGuy from "./TagGuy"

import type { Product } from "@/types"

type State = {
  loadingUpdate: boolean
  loadingUpload: boolean
  errorUpdate: string
  errorUpload: string
  imageDifferent: boolean
}

type Action =
  | { type: "UPDATE_REQUEST" }
  | { type: "UPDATE_SUCCESS" }
  | { type: "UPDATE_FAIL"; payload: string }
  | { type: "UPLOAD_REQUEST" }
  | { type: "UPLOAD_SUCCESS" }
  | { type: "UPLOAD_FAIL"; payload: string }

type FormValues = {
  name: string
  slug: string
  price: number
  image: string
  category: string
  tags: string[]
  countInStock: string
  description: string
  isFeatured: boolean
  isOnSale: boolean
  salePrice: number
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" }
    case "UPDATE_SUCCESS":
      return {
        ...state,
        loadingUpdate: false,
        errorUpdate: "",
        imageDifferent: false,
      }
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload }

    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" }
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
        imageDifferent: true,
      }
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload }

    default:
      return state
  }
}

export default function AdminProductEditScreen({
  product,
  namedTags,
  categories,
}: {
  product: Product
  namedTags: string[]
  categories: string[]
}) {
  const {
    id,
    name,
    slug,
    price,
    image,
    category,
    tags,
    countInStock,
    description,
    isFeatured,
    isOnSale,
    salePrice,
  } = product

  console.log(tags)

  const addToast = useToast()

  const [state, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
    loadingUpload: false,
    errorUpdate: "",
    errorUpload: "",
    imageDifferent: false,
  })

  const { loadingUpdate, loadingUpload } = state

  const methods = useForm<FormValues>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods

  useEffect(() => {
    setValue("name", name)
    setValue("slug", slug)
    setValue("price", price)
    setValue("category", category)
    setValue("tags", tags)
    setValue("countInStock", countInStock.toString())
    setValue("description", description)
    setValue("isFeatured", isFeatured)
    setValue("isOnSale", isOnSale)
    setValue("salePrice", salePrice)

    if (!state.imageDifferent) {
      setValue("image", image)
    }
  }, [product]) // eslint-disable-line react-hooks/exhaustive-deps

  const router = useRouter()

  const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
    try {
      dispatch({ type: "UPLOAD_REQUEST" })

      const { signature, timestamp } = await fetch(
        "/api/admin/cloudinary"
      ).then((res) => res.json())

      const file = e.target.files![0]

      const formData = new FormData()

      formData.append("file", file)
      formData.append("signature", signature)
      formData.append("timestamp", timestamp)
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)

      const data = await fetch(url, {
        method: "POST",
        body: formData,
      }).then((res) => res.json())

      dispatch({ type: "UPLOAD_SUCCESS" })

      setValue("image", data.secure_url)

      addToast("Image uploaded successfully", true)
      router.refresh()
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: (err as Error).message })
      addToast(`Image upload failed: ${(err as Error).message}`, false)
      console.log(err)
      router.refresh()
    }
  }

  const submitHandler: SubmitHandler<FormValues> = async ({
    name,
    slug,
    price,
    category,
    image,
    tags,
    countInStock,
    description,
    isFeatured,
    isOnSale,
    salePrice,
  }) => {
    if (name === "" || slug === "" || price === 0 || image === "") {
      addToast("Please fill in all required fields", false)
      return
    }
    if (countInStock === "" || Number(countInStock) < 0) {
      addToast("Please enter a valid count in stock", false)
      return
    }
    if (isOnSale && salePrice === 0) {
      addToast("Please enter a valid sale price", false)
      return
    }
    if (isOnSale && salePrice >= price) {
      addToast("Sale price must be less than the regular price", false)
      return
    } else {
      try {
        dispatch({ type: "UPDATE_REQUEST" })
        const res = await fetch(`/api/admin/products/${slug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            slug,
            price: Number(price),
            category,
            image,
            tags,
            countInStock: Number(countInStock),
            description,
            isFeatured,
            isOnSale,
            salePrice: Number(salePrice),
          }),
        })

        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.message)
        }

        dispatch({ type: "UPDATE_SUCCESS" })

        console.log({
          name,
          slug,
          price: Number(price),
          category,
          image,
          tags,
          countInStock: Number(countInStock),
          description,
          isFeatured,
          isOnSale,
          salePrice: Number(salePrice),
        })
        addToast(`Product ${name} updated successfully`, true)
        router.refresh()
        router.push("/admin/products")
      } catch (err) {
        dispatch({ type: "UPDATE_FAIL", payload: (err as Error).message })
        addToast(`Product update failed: ${(err as Error).message}`, false)
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">{`Edit Product ${slug}`}</h1>
          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="w-full"
              id="name"
              autoFocus
              {...register("name", {
                required: "Please enter name",
              })}
            />
            {errors.name && (
              <div className="text-Red">{errors.name.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              className="w-full"
              disabled
              id="slug"
              {...register("slug", {
                required: "Please enter slug",
              })}
            />
            <Link className="text-Red" href={`/admin/product/${id}`}>
              Slug cannot be changed on this screen. Click here to go to slug
              edit screen
            </Link>
            {errors.slug && (
              <div className="text-Red">{errors.slug.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="price">Price</label>
            <p className="absolute -translate-y-16 translate-x-12 text-xl text-blue">
              $
            </p>
            <input
              type="text"
              className="ml-4 mb-4 w-24 pl-6 pr-2"
              id="price"
              {...register("price", {
                required: "Please enter price",
              })}
            />
            {errors.price && (
              <div className="text-Red">{errors.price.message}</div>
            )}
          </div>
          <div className="mb-4">
            {image && (
              <Image
                src={image}
                alt={name}
                width={200}
                height={200}
                className="mb-4"
              />
            )}
            {state.imageDifferent && (
              <h1 className="text-lg text-Red">
                This is the old image. Update the product to see the new image
              </h1>
            )}
            <label htmlFor="image">image</label>
            <input
              type="text"
              className="w-full"
              id="image"
              {...register("image", {
                required: "Please enter image",
              })}
            />
            {errors.image && (
              <div className="text-Red">{errors.image.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="imageFile">Upload image</label>
            <input
              type="file"
              className="w-full"
              id="imageFile"
              onChange={uploadHandler}
            />

            {loadingUpload && <div>Uploading....</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="category">category</label>
            <input
              type="text"
              className="w-full"
              id="category"
              {...register("category", {
                required: "Please enter category",
              })}
            />
            {errors.category && (
              <div className="text-Red">{errors.category.message}</div>
            )}
          </div>
          <div className="mb-4 flex flex-col items-start">
            <p className="text-orange drop-shadow">Categories</p>
            <div className="flex max-h-40 flex-row flex-wrap overflow-y-auto">
              {categories
                .map((category) => (
                  <div
                    key={category}
                    className="mr-2 mb-2 flex flex-row items-center justify-center"
                  >
                    <button
                      className="rounded-md border-2 border-orange bg-orange px-2 py-1"
                      onClick={() => setValue("category", category)}
                      type="button"
                    >
                      {category}
                    </button>
                  </div>
                ))
                .sort((a: any, b: any) => {
                  if (a.key < b.key) {
                    return -1
                  }
                  if (a.key > b.key) {
                    return 1
                  }
                  return 0
                })}
            </div>
          </div>
          <TagGuy tags={tags} namedTags={namedTags} />
          <div className="mb-4">
            <label htmlFor="countInStock">Amount in stock</label>
            <input
              type="text"
              className="ml-4 mb-4 w-24 pl-6 pr-2"
              id="countInStock"
              {...register("countInStock", {
                required: "Please enter countInStock",
              })}
            />
            {errors.countInStock && (
              <div className="text-Red">{errors.countInStock.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="countInStock">description</label>
            <input
              type="text"
              className="w-full"
              id="description"
              {...register("description", {
                required: "Please enter description",
              })}
            />
            {errors.description && (
              <div className="text-Red">{errors.description.message}</div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="isFeatured">Currently Featured?</label>
            <input
              type="checkbox"
              className="mr-5 ml-0 h-6 w-6"
              id="isFeatured"
              {...register("isFeatured")}
            />
            <label htmlFor="isOnSale">On Sale?</label>
            <input
              type="checkbox"
              className="mr-5 h-6 w-6"
              id="isOnSale"
              {...register("isOnSale")}
            />
            <label htmlFor="isOnSale">Sale Price</label>
            <input
              type="text"
              className="ml-4 mb-4 w-24 pl-6 pr-2"
              id="salePrice"
              {...register("salePrice")}
            />
          </div>

          <div className="mb-4">
            <Button disabled={loadingUpdate} type="submit">
              {loadingUpdate ? "Loading" : "Update"}
            </Button>
          </div>
          <div className="mb-4">
            <Link href={`/admin/products`}>Back</Link>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}
