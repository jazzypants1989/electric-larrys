"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useReducer } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useAtom } from "jotai"

import { Product } from "../../../../utils/dataHooks/getProducts"
import toastStore from "../../../../utils/ToastStore"

type State = {
  loadingUpdate: boolean
  loadingUpload: boolean
  errorUpdate: string
  errorUpload: string
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
  tags: string
  countInStock: string
  description: string
  isFeatured: boolean
  isOnSale: boolean
  salePrice: number
}

const randomID = Math.random().toString(36).substring(2, 15)

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" }
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" }
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload }

    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" }
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      }
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload }

    default:
      return state
  }
}

export default function AdminProductEditScreen({
  product,
}: {
  product: Product
}) {
  const {
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

  const [, setToasts] = useAtom(toastStore)

  const [state, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
    loadingUpload: false,
    errorUpdate: "",
    errorUpload: "",
  })

  const { loadingUpdate, loadingUpload } = state

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>()

  useEffect(() => {
    setValue("name", name)
    setValue("slug", slug)
    setValue("price", price)
    setValue("image", image)
    setValue("category", category)
    setValue("tags", tags.map((tag) => tag).join(", "))
    setValue("countInStock", countInStock.toString())
    setValue("description", description)
    setValue("isFeatured", isFeatured)
    setValue("isOnSale", isOnSale)
    setValue("salePrice", salePrice)
  }, [product]) // eslint-disable-line react-hooks/exhaustive-deps

  const router = useRouter()

  const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
    try {
      dispatch({ type: "UPLOAD_REQUEST" })

      const {
        data: { signature, timestamp },
      } = await fetch("/api/cloudinary").then((res) => res.json())

      const file = e.target.files![0]

      const formData = new FormData()

      formData.append("file", file)
      formData.append("signature", signature)
      formData.append("timestamp", timestamp)
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)

      const { data } = await fetch(url, {
        method: "POST",
        body: formData,
      }).then((res) => res.json())

      dispatch({ type: "UPLOAD_SUCCESS" })

      setValue("image", data.secure_url)

      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: "Image uploaded successfully",
            success: true,
          },
        ],
      }))
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: (err as Error).message })
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: "Image upload failed",
            success: false,
          },
        ],
      }))
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
    const tagArray = tags.split(",").map((tag) => tag.trim())

    try {
      dispatch({ type: "UPDATE_REQUEST" })
      await fetch(`/api/admin/products/${slug}`, {
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
          tags: tagArray,
          countInStock: Number(countInStock),
          description,
          isFeatured,
          isOnSale,
          salePrice: Number(salePrice),
        }),
      }).then((res) => res.json())

      dispatch({ type: "UPDATE_SUCCESS" })

      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: "Product updated successfully",
            success: true,
          },
        ],
      }))
      router.push("/admin/products")
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: (err as Error).message })
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: "Product update failed",
            success: false,
          },
        ],
      }))
    }
  }

  return (
    <div className="grid md:grid-cols-4 md:gap-5">
      <div className="md:col-span-3">
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
              id="slug"
              {...register("slug", {
                required: "Please enter slug",
              })}
            />
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
          <div className="mb-4">
            <label htmlFor="tags">tags</label>
            <input
              type="text"
              className="w-full"
              id="tags"
              {...register("tags", {
                required: "Please enter tags",
              })}
            />
            {errors.tags && (
              <div className="text-Red">{errors.tags.message}</div>
            )}
          </div>
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
            <button disabled={loadingUpdate} className="primary-button">
              {loadingUpdate ? "Loading" : "Update"}
            </button>
          </div>
          <div className="mb-4">
            <Link href={`/admin/products`}>Back</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
