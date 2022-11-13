import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useReducer } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import AdminSideBar from "../../../components/AdminSideBar"
import Layout from "../../../components/Layout"
import { getError } from "../../../utils/error"

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }

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
export default function AdminProductEditScreen() {
  const { query } = useRouter()
  const productId = query.id
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" })
        const { data } = await axios.get(`/api/admin/products/${productId}`)
        dispatch({ type: "FETCH_SUCCESS" })
        setValue("name", data.name)
        setValue("slug", data.slug)
        setValue("price", data.price)
        setValue("image", data.image)
        setValue("category", data.category)
        setValue("tags", data.tags)
        setValue("countInStock", data.countInStock)
        setValue("description", data.description)
        setValue("isFeatured", data.isFeatured)
        setValue("isRented", data.isRented)
        setValue("isOnSale", data.isOnSale)
        setValue("salePrice", data.salePrice)
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) })
      }
    }

    fetchData()
  }, [productId, setValue])

  const router = useRouter()

  const uploadHandler = async (e, imageField = "image") => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
    try {
      dispatch({ type: "UPLOAD_REQUEST" })
      const {
        data: { signature, timestamp },
      } = await axios("/api/admin/cloudinary-sign")

      const file = e.target.files[0]
      const formData = new FormData()
      formData.append("file", file)
      formData.append("signature", signature)
      formData.append("timestamp", timestamp)
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
      const { data } = await axios.post(url, formData)
      dispatch({ type: "UPLOAD_SUCCESS" })
      setValue(imageField, data.secure_url)
      toast.success("File uploaded successfully")
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) })
      toast.error(getError(err))
    }
  }

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    image,
    tags,
    countInStock,
    description,
    isFeatured,
    isRented,
    isOnSale,
    salePrice,
  }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" })
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        tags,
        countInStock,
        description,
        isFeatured,
        isRented,
        isOnSale,
        salePrice,
      })
      dispatch({ type: "UPDATE_SUCCESS" })
      toast.success("Product updated successfully")
      router.push("/admin/products")
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) })
      toast.error(getError(err))
    }
  }

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <AdminSideBar />
        </div>
        <div className="md:col-span-3">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>
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
                <p className="absolute text-blue text-xl -translate-y-16 translate-x-16">
                  $
                </p>
                <input
                  type="text"
                  className="w-24 pl-6 pr-2 ml-4 mb-4"
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
                  className="w-24 pl-6 pr-2 ml-4 mb-4"
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
                  className="w-6 h-6 mr-5 ml-0"
                  id="isFeatured"
                  name="isFeatured"
                  {...register("isFeatured")}
                />
                <label htmlFor="isRented">
                  In stock, but all currently rented?
                </label>
                <input
                  type="checkbox"
                  className="w-6 h-6 mr-5 pr-2"
                  id="isRented"
                  name="isRented"
                  {...register("isRented")}
                />
                <label htmlFor="isOnSale">On Sale?</label>
                <input
                  type="checkbox"
                  className="w-6 h-6 mr-5"
                  id="isOnSale"
                  name="isOnSale"
                  {...register("isOnSale")}
                />
                <label htmlFor="isOnSale">Sale Price</label>
                <p className="absolute text-Red translate-x-72 translate-y-28 pl-4 text-3xl">
                  $
                </p>
                <input
                  type="text"
                  className="w-24 pl-6 pr-2 text-orange"
                  id="salePrice"
                  name="salePrice"
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
          )}
        </div>
      </div>
    </Layout>
  )
}

AdminProductEditScreen.auth = { adminOnly: true }
