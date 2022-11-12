import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useReducer } from "react"
import { toast } from "react-toastify"
import AdminSideBar from "../../components/AdminSideBar"
import Layout from "../../components/Layout"
import { getError } from "../../utils/error"

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" }
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        announcements: action.payload,
        error: "",
      }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true }
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false }
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false }
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true }
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true }
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false }
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false }

    default:
      state
  }
}

export default function AdminAnnouncementsScreen() {
  const router = useRouter()

  const [
    {
      loading,
      error,
      announcements,
      loadingCreate,
      successDelete,
      loadingDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    announcements: [],
    error: "",
  })

  const createHandler = async () => {
    if (!window.confirm("This will create a dummy announcement. Continue?")) {
      return
    }
    try {
      dispatch({ type: "CREATE_REQUEST" })
      const { data } = await axios.post(`/api/admin/announcements`)
      dispatch({ type: "CREATE_SUCCESS", payload: data })
      toast.success("Announcement created successfully")
      router.push(`/admin/announcement/${data.announcement._id}`)
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" })
      toast.error(getError(err))
    }
  }

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" })
        const { data } = await axios.get(`/api/admin/announcements`)
        dispatch({ type: "FETCH_SUCCESS", payload: data })
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) })
      }
    }

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" })
    } else {
      fetchAnnouncements()
    }
  }, [successDelete])

  const deleteHandler = async (id) => {
    if (!window.confirm("Are you sure?")) {
      return
    }
    try {
      dispatch({ type: "DELETE_REQUEST" })
      await axios.delete(`/api/admin/announcements/${id}`)
      dispatch({ type: "DELETE_SUCCESS" })
      toast.success("Announcement deleted successfully")
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" })
      toast.error(getError(err))
    }
  }

  return (
    <Layout title="Announcements">
      <div className="grid md:grid-cols-4 md:gap-4 sm:grid-cols-1 sm:gap-4">
        <AdminSideBar />
        <div className="overflow-x-auto md:col-span-3">
          <div className="flex justify-between">
            <h1 className="mb-4 text-xl">Announcements</h1>
            {loadingDelete && <div>Deleting item...</div>}
            <button
              disabled={loadingCreate}
              onClick={createHandler}
              className="primary-button mr-10"
            >
              {loadingCreate ? "Loading" : "Create"}
            </button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto px-4">
              <table className="min-w-full px-4">
                <thead className="border-b m-6 p-4">
                  <tr className="mt-2">
                    <th className=" text-center px-4">TITLE</th>
                    <th className=" text-center px-4 mx-10">DESCRIPTION</th>
                    <th className=" text-center px-4">LINK</th>
                    <th className=" text-center px-4">PUBLIC</th>
                    <th className=" text-center px-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map((announcement) => (
                    <tr key={announcement._id}>
                      <td className="text-center m-4">{announcement.title}</td>
                      <td className="text-center m-4 mx-10">
                        {announcement.description}
                      </td>
                      <td className="text-center m-4 text-lg hover:scale-150 duration-300 ease-in-out">
                        {!announcement.link ||
                        announcement.link == "no".toLowerCase()
                          ? "❌"
                          : "💯"}
                      </td>
                      <td className="text-center m-4 text-lg hover:scale-150 duration-300 ease-in-out">
                        {announcement.isPublished ? "💯" : "❌"}
                      </td>
                      <td className="text-center m-4">
                        <button
                          onClick={() =>
                            router.push(
                              `/admin/announcement/${announcement._id}`
                            )
                          }
                          className="primary-button m-2 w-24"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteHandler(announcement._id)}
                          className="default-button m-2 w-24 text-Red hover:text-Green hover:bg-Red"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

AdminAnnouncementsScreen.auth = { adminOnly: true }
