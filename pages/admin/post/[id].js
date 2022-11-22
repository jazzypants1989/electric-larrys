import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useReducer } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Layout from "../../../components/Layout"
import { getError } from "../../../utils/error"
import AdminSideBar from "../../../components/Admin/AdminSideBar"

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
export default function AdminPostEditScreen() {
  const { query } = useRouter()
  const postId = query.id
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
        const { data } = await axios.get(`/api/admin/posts/${postId}`)
        dispatch({ type: "FETCH_SUCCESS" })
        setValue("title", data.title)
        setValue("description", data.description)
        setValue("link", data.link)
        setValue("isPublished", data.isPublished)
        setValue("isFeatured", data.isFeatured)
        setValue("image", data.image)
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) })
      }
    }

    fetchData()
  }, [postId, setValue])

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
    title,
    description,
    link,
    isPublished,
    isFeatured,
    image,
  }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" })
      await axios.put(`/api/admin/posts/${postId}`, {
        title,
        description,
        link,
        isPublished,
        isFeatured,
        image,
      })
      dispatch({ type: "UPDATE_SUCCESS" })
      toast.success("Post updated successfully")
      router.push("/admin/posts")
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) })
      toast.error(getError(err))
    }
  }

  return (
    <Layout title={`Edit Post ${postId}`}>
      <div className="md:flex gap-4 md:col-span-3">
        <AdminSideBar />
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="mb-4 text-xl">{`Edit Post ${postId}`}</h1>
            <div className="mb-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="w-full"
                id="title"
                autoFocus
                {...register("title", {
                  required: "Please enter a title",
                })}
              />
              {errors.title && (
                <div className="text-Red">{errors.title.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="description">Description</label>
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
            <div className="mb-4">
              <label htmlFor="image">
                Image (type &quot;no&quot; to avoid)
              </label>
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
              <label htmlFor="link">
                External Link (type &quot;no&quot; to avoid)
              </label>
              <input
                type="text"
                className="w-full"
                id="link"
                {...register("link")}
              />
              {errors.link && (
                <div className="text-Red">{errors.link.message}</div>
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
              <label htmlFor="isPublished">Currently Published?</label>
              <input
                type="checkbox"
                className="w-6 h-6 mr-5 pr-2"
                id="isPublished"
                name="isPublished"
                {...register("isPublished")}
              />
            </div>

            <div className="mb-4">
              <button disabled={loadingUpdate} className="primary-button">
                {loadingUpdate ? "Loading" : "Update"}
              </button>
            </div>
            <div className="mb-4">
              <Link href={`/admin/posts`}>Back</Link>
            </div>
          </form>
        )}
      </div>
    </Layout>
  )
}

AdminPostEditScreen.auth = { adminOnly: true }
