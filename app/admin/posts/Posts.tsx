"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useReducer } from "react"
import { useAtom } from "jotai"
import toastStore from "../../../utils/ToastStore"
import { Post } from "@prisma/client"

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

export default function Posts({ posts }: { posts: Post[] }) {
  const router = useRouter()
  const [, setToasts] = useAtom(toastStore)

  const [state, dispatch] = useReducer(reducer, {
    loadingCreate: false,
    loadingDelete: false,
    successDelete: false,
  })

  const { loadingCreate, loadingDelete, successDelete } = state

  const createPostHandler = async () => {
    if (!window.confirm("Create a new post?")) return
    try {
      dispatch({ type: "CREATE_REQUEST" })
      const data = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())

      dispatch({ type: "CREATE_SUCCESS" })
      router.push(`/admin/posts/${data.id}`)
    } catch (error) {
      dispatch({ type: "CREATE_FAIL" })
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: "Failed to create post",
            success: false,
          },
        ],
      }))
    }
  }

  const deletePostHandler = async (id: string) => {
    if (!window.confirm("Delete this post?")) return
    try {
      dispatch({ type: "DELETE_REQUEST" })
      await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      })
      dispatch({ type: "DELETE_SUCCESS" })
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: "Post deleted successfully",
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
            message: "Failed to delete post",
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
    <div className="overflow-x-auto drop-shadow md:col-span-3">
      <div className="m-2 flex items-center justify-between">
        <h1 className="mx-auto mb-4 text-xl">Posts</h1>
        {loadingDelete && <div>Deleting item...</div>}
        <button
          className="btn btn-primary"
          onClick={createPostHandler}
          disabled={loadingCreate}
        >
          Create Post
        </button>
      </div>
      <table className="w-full table-auto">
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
            <tr key={post.id} className="border-b">
              <td className="px-4 py-2 text-center">{post.title}</td>
              <td className="px-4 py-2 text-center">{post.description}</td>
              <td className="m-4 cursor-crosshair text-center text-lg duration-300 ease-in-out hover:scale-150">
                {!post.link ? "❌" : "💯"}
              </td>
              <td className="m-4 cursor-crosshair text-center text-lg duration-300 ease-in-out hover:scale-150">
                {!post.image ? "❌" : "💯"}
              </td>
              <td className="m-4 cursor-crosshair text-center text-lg duration-300 ease-in-out hover:scale-150">
                {!post.isFeatured ? "❌" : "💯"}
              </td>
              <td className="m-4 cursor-crosshair text-center text-lg duration-300 ease-in-out hover:scale-150">
                {!post.isPublished ? "❌" : "💯"}
              </td>
              <td className="px-4 py-2 text-center">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="primary-button"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePostHandler(post.id)}
                  disabled={loadingDelete}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
