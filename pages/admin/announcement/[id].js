import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useReducer } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import AdminSideBar from "../../../components/Admin/AdminSideBar"
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

    default:
      return state
  }
}
export default function AdminAnnouncementEditScreen() {
  const { query } = useRouter()
  const announcementId = query.id
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
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
        const { data } = await axios.get(
          `/api/admin/announcements/${announcementId}`
        )
        dispatch({ type: "FETCH_SUCCESS" })
        setValue("title", data.title)
        setValue("description", data.description)
        setValue("link", data.link)
        setValue("isPublished", data.isPublished)
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) })
      }
    }

    fetchData()
  }, [announcementId, setValue])

  const router = useRouter()

  const submitHandler = async ({ title, description, link, isPublished }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" })
      await axios.put(`/api/admin/announcements/${announcementId}`, {
        title,
        description,
        link,
        isPublished,
      })
      dispatch({ type: "UPDATE_SUCCESS" })
      toast.success("Announcement updated successfully")
      router.push("/admin/announcements")
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) })
      toast.error(getError(err))
    }
  }

  return (
    <Layout title={`Edit Announcement ${announcementId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <AdminSideBar />
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
              <h1 className="mb-4 text-xl">{`Edit Announcement ${announcementId}`}</h1>
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
                <label htmlFor="description">
                  Description (type &quot;no&quot; to avoid)
                </label>
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
              <label htmlFor="isPublished">Currently Published?</label>
              <input
                type="checkbox"
                className="w-6 h-6 p-6 m-6"
                id="isPublished"
                name="isPublished"
                {...register("isPublished")}
              />
              <div className="mb-4">
                <button disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? "Loading" : "Update"}
                </button>
              </div>
              <div className="mb-4">
                <Link href={`/admin/announcements`}>Back</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  )
}

AdminAnnouncementEditScreen.auth = { adminOnly: true }
