import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useReducer } from "react"
import { toast } from "react-toastify"
import AdminSideBar from "../../components/Admin/AdminSideBar"
import Layout from "../../components/Layout"
import { getError } from "../../utils/error"

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, posts: action.payload, error: "" }
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

export default function AdminPostsScreen() {
  const router = useRouter()

  const [
    { loading, error, posts, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    posts: [],
    error: "",
  })

  const createHandler = async () => {
    if (!window.confirm("This will create a dummy post. Continue?")) {
      return
    }
    try {
      dispatch({ type: "CREATE_REQUEST" })
      const { data } = await axios.post(`/api/admin/posts`)
      dispatch({ type: "CREATE_SUCCESS", payload: data })
      toast.success("Post created successfully")
      router.push(`/admin/post/${data.sliderPost._id}`)
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" })
      toast.error(getError(err))
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" })
        const { data } = await axios.get(`/api/admin/posts`)
        dispatch({ type: "FETCH_SUCCESS", payload: data })
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) })
      }
    }

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" })
    } else {
      fetchPosts()
    }
  }, [successDelete])

  const deleteHandler = async (id) => {
    if (!window.confirm("Are you sure?")) {
      return
    }
    try {
      dispatch({ type: "DELETE_REQUEST" })
      await axios.delete(`/api/admin/posts/${id}`)
      dispatch({ type: "DELETE_SUCCESS" })
      toast.success("Post deleted successfully")
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" })
      toast.error(getError(err))
    }
  }

  return (
    <Layout title="Posts">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <AdminSideBar />
        <div className="overflow-x-auto md:col-span-3">
          <div className="flex justify-between">
            <h1 className="mb-4 text-xl">Posts</h1>
            {loadingDelete && <div>Deleting item...</div>}
            <button
              disabled={loadingCreate}
              onClick={createHandler}
              className="primary-button mr-9"
            >
              {loadingCreate ? "Loading" : "Create"}
            </button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="my-3 rounded-lg p-3">{error}</div>
          ) : (
            <div className="overflow-x-auto px-4">
              <table className="min-w-full px-4">
                <thead className="m-6 border-b p-4">
                  <tr className="mt-2">
                    <th className=" px-4 text-center">TITLE</th>
                    <th className=" mx-10 px-4 text-center">DESCRIPTION</th>
                    <th className=" px-4 text-center">LINK</th>
                    <th className=" px-4 text-center">IMAGE</th>
                    <th className=" px-4 text-center">FEATURED</th>
                    <th className=" px-4 text-center">PUBLIC</th>
                    <th className=" px-4 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post._id}>
                      <td className="m-4 text-center">{post.title}</td>
                      <td className="m-4 mx-10 text-center">
                        {post.description}
                      </td>
                      <td className="m-4 cursor-crosshair text-center text-lg duration-300 ease-in-out hover:scale-150">
                        {!post.link || post.link == "no".toLowerCase()
                          ? "❌"
                          : "💯"}
                      </td>
                      <td className="m-4 cursor-crosshair text-center text-lg duration-300 ease-in-out hover:scale-150">
                        {!post.image || post.image == "no".toLowerCase()
                          ? "❌"
                          : "💯"}
                      </td>
                      <td className="m-4 cursor-crosshair text-center text-lg duration-300 ease-in-out hover:scale-150">
                        {post.isFeatured ? "💯" : "❌"}
                      </td>
                      <td className="m-4 cursor-crosshair text-center text-lg duration-300 ease-in-out hover:scale-150">
                        {post.isPublished ? "💯" : "❌"}
                      </td>
                      <td className="m-4 text-center">
                        <button
                          onClick={() => router.push(`/admin/post/${post._id}`)}
                          className="primary-button m-2 w-24"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteHandler(post._id)}
                          className="default-button m-2 w-24 text-Red hover:bg-Red hover:text-Green"
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

AdminPostsScreen.auth = { adminOnly: true }
