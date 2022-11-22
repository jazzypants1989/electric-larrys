import axios from "axios"
import Link from "next/link"
import React, { useEffect, useReducer } from "react"
import Layout from "../../components/Layout"
import { getError } from "../../utils/error"
import AdminSideBar from "../../components/Admin/AdminSideBar"

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }
    default:
      state
  }
}
function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" })
        const { data } = await axios.get(`/api/admin/summary`)
        dispatch({ type: "FETCH_SUCCESS", payload: data })
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) })
      }
    }

    fetchData()
  }, [])

  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5">
        <AdminSideBar />
        <div className="md:col-span-3">
          <h1 className="mb-4 text-xl">Admin Dashboard</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="card m-2 p-2">
                  <p className="text-3xl">{summary.productsCount} </p>
                  <p>Products</p>
                  <Link href="/admin/products">View products</Link>
                </div>
                <div className="card m-2 p-2">
                  <p className="text-3xl">{summary.usersCount} </p>
                  <p>Users</p>
                  <Link href="/admin/users">View users</Link>
                </div>
                <div className="card m-2 p-2">
                  <p className="text-3xl">{summary.announcementsCount} </p>
                  <p>Announcements</p>
                  <Link href="/admin/announcements">View announcements</Link>
                </div>
                <div className="card m-2 p-2">
                  <p className="text-3xl">{summary.notesCount} </p>
                  <p>Notes</p>
                  <p className="text-orange">(Look below.)</p>
                </div>
                <div className="card m-2 p-2">
                  <p className="text-3xl">{summary.sliderPostsCount} </p>
                  <p>Posts</p>
                  <Link href="/admin/posts">View posts</Link>
                </div>
              </div>
              <div className="text-center">
                <h1 className="mb-4 text-xl">Notes</h1>
                <button
                  className="primary-button"
                  onClick={() => alert("Coming soon!")}
                >
                  Create a new note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

AdminDashboardScreen.auth = { adminOnly: true }
export default AdminDashboardScreen
