import axios from "axios"
import Link from "next/link"
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
      return { ...state, loading: false, users: action.payload, error: "" }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true }
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true }
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false }
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false }
    default:
      return state
  }
}

function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: "",
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" })
        const { data } = await axios.get(`/api/admin/users`)
        dispatch({ type: "FETCH_SUCCESS", payload: data })
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) })
      }
    }
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" })
    } else {
      fetchData()
    }
  }, [successDelete])

  const deleteHandler = async (userId, email) => {
    if (!window.confirm("Are you sure?")) {
      return
    }
    if (email.toLowerCase() == "jessepence@gmail.com") {
      toast.error("Who's the big boi now?")
      return
    }
    try {
      dispatch({ type: "DELETE_REQUEST" })
      await axios.delete(`/api/admin/users/${userId}`)
      dispatch({ type: "DELETE_SUCCESS" })
      toast.success("User deleted successfully")
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" })
      toast.error(getError(err))
    }
  }

  return (
    <Layout title="Users">
      <div className="grid md:grid-cols-4 md:gap-5">
        <AdminSideBar />
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-4 text-xl drop-shadow ">Users</h1>
          {loadingDelete && <div>Deleting...</div>}
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b drop-shadow">
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">NAME</th>
                    <th className="text-center">EMAIL</th>
                    <th className="text-center">NEWSLETTER</th>
                    <th className="text-center">ADMIN</th>
                    <th className="text-center">EMPLOYEE</th>
                    <th className="text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className=" text-center ">
                        {user._id.substring(20, 24)}
                      </td>
                      <td className=" text-center ">{user.name}</td>
                      <td className=" text-center ">{user.email}</td>
                      <td className=" text-center ">
                        {user.newsletter ? "Subscribed" : "Unsubscribed"}
                      </td>
                      <td className=" text-center ">
                        {user.isAdmin ? "YES" : "NO"}
                      </td>
                      <td className=" text-center ">
                        {user.isEmployee ? "Employee" : "Customer"}
                      </td>
                      <td className=" text-center ">
                        <Link
                          href={`/admin/users/${user._id}`}
                          type="button"
                          className="default-button"
                        >
                          Edit
                        </Link>
                        &nbsp;
                        <button
                          type="button"
                          className="default-button hover:bg-Red"
                          onClick={() => deleteHandler(user._id, user.email)}
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

AdminUsersScreen.auth = { adminOnly: true }
export default AdminUsersScreen
