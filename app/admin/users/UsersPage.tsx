"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useReducer } from "react"
import { useAtom } from "jotai"
import toastStore from "../../../utils/ToastStore"
import { User } from "@prisma/client"
import Image from "next/image"

type State = {
  loadingCreate: boolean
  loadingDelete: boolean
  successDelete: boolean
}

type Action =
  | { type: "CREATE_REQUEST" }
  | { type: "CREATE_SUCCESS" }
  | { type: "CREATE_FAIL" }
  | { type: "DELETE_REQUEST" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_FAIL" }
  | { type: "DELETE_RESET" }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
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
      return { ...state, successDelete: false }
    default:
      return state
  }
}

const randomID = Math.random().toString(36).substring(2, 15)

export default function Users({ users }: { users: User[] }) {
  const router = useRouter()
  const [, setToasts] = useAtom(toastStore)

  const [state, dispatch] = useReducer(reducer, {
    loadingCreate: false,
    loadingDelete: false,
    successDelete: false,
  })

  const { loadingCreate, loadingDelete, successDelete } = state

  const createUserHandler = async () => {
    if (!window.confirm("Create a new user?")) return
    try {
      dispatch({ type: "CREATE_REQUEST" })
      const data = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())

      dispatch({ type: "CREATE_SUCCESS" })
      router.push(`/admin/users/${data.id}`)
    } catch (error) {
      dispatch({ type: "CREATE_FAIL" })
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: "Failed to create user",
            success: false,
          },
        ],
      }))
    }
  }

  const deleteUserHandler = async (id: string) => {
    console.log(id)
    if (!window.confirm("Delete this user?")) return
    try {
      dispatch({ type: "DELETE_REQUEST" })
      await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      })
      dispatch({ type: "DELETE_SUCCESS" })
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: "User deleted successfully",
            success: true,
          },
        ],
      }))
      router.refresh()
    } catch (error) {
      dispatch({ type: "DELETE_FAIL" })
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: "Failed to delete user",
            success: false,
          },
        ],
      }))
    }
  }

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" })
    }
  }, [successDelete])

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="mx-auto text-2xl font-semibold">Users</h1>
        <button className="primary-button" onClick={createUserHandler}>
          {loadingCreate ? "Creating..." : "Create"}
        </button>
      </div>
      <div className="mt-4 flex flex-col">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between border-b border-Green p-4"
          >
            <div className="flex items-center space-x-4">
              {user.image && user.name && (
                <Image
                  src={user.image}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                  width={40}
                  height={40}
                />
              )}
              <div className="flex flex-col px-4">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col items-center border-x border-Green px-4">
              <p>{user.isAdmin ? "Big Boss" : "Humble human"}</p>
              <p>{user.isEmployee ? "Employee" : "Customer"}</p>
            </div>
            <div className="flex items-center px-4">
              <Link
                href={`/admin/users/${user.id}`}
                className="primary-button mr-4"
              >
                Edit
              </Link>
              <button
                className="text-Red"
                onClick={() => deleteUserHandler(user.id)}
              >
                {loadingDelete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

{
  /*
// function reducer(state, action) {
//   switch (action.type) {
//     case "FETCH_REQUEST":
//       return { ...state, loading: true, error: "" }
//     case "FETCH_SUCCESS":
//       return { ...state, loading: false, users: action.payload, error: "" }
//     case "FETCH_FAIL":
//       return { ...state, loading: false, error: action.payload }

//     case "DELETE_REQUEST":
//       return { ...state, loadingDelete: true }
//     case "DELETE_SUCCESS":
//       return { ...state, loadingDelete: false, successDelete: true }
//     case "DELETE_FAIL":
//       return { ...state, loadingDelete: false }
//     case "DELETE_RESET":
//       return { ...state, loadingDelete: false, successDelete: false }
//     default:
//       return state
//   }
// }

// function AdminUsersScreen() {
//   const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
//     useReducer(reducer, {
//       loading: true,
//       users: [],
//       error: "",
//     })

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch({ type: "FETCH_REQUEST" })
//         const { data } = await axios.get(`/api/admin/users`)
//         dispatch({ type: "FETCH_SUCCESS", payload: data })
//       } catch (err) {
//         dispatch({ type: "FETCH_FAIL", payload: getError(err) })
//       }
//     }
//     if (successDelete) {
//       dispatch({ type: "DELETE_RESET" })
//     } else {
//       fetchData()
//     }
//   }, [successDelete])

//   const deleteHandler = async (userId, email) => {
//     if (!window.confirm("Are you sure?")) {
//       return
//     }
//     if (email.toLowerCase() == "jessepence@gmail.com") {
//       toast.error("Who's the big boi now?")
//       return
//     }
//     try {
//       dispatch({ type: "DELETE_REQUEST" })
//       await axios.delete(`/api/admin/users/${userId}`)
//       dispatch({ type: "DELETE_SUCCESS" })
//       toast.success("User deleted successfully")
//     } catch (err) {
//       dispatch({ type: "DELETE_FAIL" })
//       toast.error(getError(err))
//     }
//   }

//   return (
//     <Layout title="Users">
//       <div className="grid md:grid-cols-4 md:gap-5">
//         <AdminSideBar />
//         <div className="overflow-x-auto md:col-span-3">
//           <h1 className="mb-4 text-xl drop-shadow ">Users</h1>
//           {loadingDelete && <div>Deleting...</div>}
//           {loading ? (
//             <div>Loading...</div>
//           ) : error ? (
//             <div className="my-3 rounded-lg p-3">{error}</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead className="border-b drop-shadow">
//                   <tr>
//                     <th className="text-center">ID</th>
//                     <th className="text-center">NAME</th>
//                     <th className="text-center">EMAIL</th>
//                     <th className="text-center">NEWSLETTER</th>
//                     <th className="text-center">ADMIN</th>
//                     <th className="text-center">EMPLOYEE</th>
//                     <th className="text-center">ACTIONS</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user) => (
//                     <tr key={user._id} className="border-b">
//                       <td className=" text-center ">
//                         {user._id.substring(20, 24)}
//                       </td>
//                       <td className=" text-center ">{user.name}</td>
//                       <td className=" text-center ">{user.email}</td>
//                       <td className=" text-center ">
//                         {user.newsletter ? "Subscribed" : "Unsubscribed"}
//                       </td>
//                       <td className=" text-center ">
//                         {user.isAdmin ? "YES" : "NO"}
//                       </td>
//                       <td className=" text-center ">
//                         {user.isEmployee ? "Employee" : "Customer"}
//                       </td>
//                       <td className=" text-center ">
//                         <Link
//                           href={`/admin/users/${user._id}`}
//                           type="button"
//                           className="default-button"
//                         >
//                           Edit
//                         </Link>
//                         &nbsp;
//                         <button
//                           type="button"
//                           className="default-button hover:bg-Red"
//                           onClick={() => deleteHandler(user._id, user.email)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   )
// }

// AdminUsersScreen.auth = { adminOnly: true }
// export default AdminUsersScreen */
}
