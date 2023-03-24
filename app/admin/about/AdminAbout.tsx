"use client"

import { useRouter } from "next/navigation"
import React, { useEffect, useReducer } from "react"
import Button from "../../../components/Layout/Button"
import useToast from "../../../utils/useToast"
import Spinner from "../../../components/Layout/Spinner"

import type { About } from "../../../utils/dataHooks/getAbout"

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

export default function AdminAbout({ abouts }: { abouts: About[] }) {
  const router = useRouter()
  const addToast = useToast()

  const [state, dispatch] = useReducer(reducer, {
    loadingCreate: false,
    loadingDelete: false,
    successDelete: false,
  })

  const { loadingCreate, loadingDelete, successDelete } = state

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" })
    }
  }),
    [successDelete]

  const createAboutHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" })

      const data = await fetch("/api/admin/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const res = await data.json()

      if (res.error) {
        throw new Error(res.error)
      }

      dispatch({ type: "CREATE_SUCCESS" })
      addToast("About template created, redirecting...", true)
      router.push(`/admin/about/${res.about.id}`)
    } catch (error) {
      dispatch({ type: "CREATE_FAIL" })
      addToast((error as Error).message, false)
    }
  }

  const deleteAboutHandler = async (id: string | undefined) => {
    if (!id) return
    if (!window.confirm("Delete this about template?")) return
    try {
      dispatch({ type: "DELETE_REQUEST" })

      const data = await fetch(`/api/admin/about/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const res = await data.json()

      if (res.error) {
        throw new Error(res.error)
      }

      const message = res.message

      addToast(message, true)
      dispatch({ type: "DELETE_SUCCESS" })
      router.refresh()
    } catch (error) {
      dispatch({ type: "DELETE_FAIL" })
      addToast((error as Error).message, false)
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold drop-shadow">About Templates</h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Hero Text</th>
              <th className="px-4 py-2">Published</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {abouts.map((about) => (
              <tr key={about?.id}>
                <td className="border px-4 py-2">{about?.title}</td>
                <td className="border px-4 py-2">{about?.heroText}</td>
                <td className="border px-4 py-2 text-center text-2xl">
                  {about?.isPublished ? "💯" : "❌"}
                </td>
                <td className="border px-4 py-2">
                  <Button
                    onClick={() => router.push(`/admin/about/${about?.id}`)}
                  >
                    Edit
                  </Button>
                  {loadingDelete ? (
                    <div className="flex items-center justify-center p-2">
                      <Spinner />
                    </div>
                  ) : (
                    <Button
                      className="bg-Red"
                      onClick={() => deleteAboutHandler(about?.id)}
                      disabled={loadingDelete}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loadingCreate ? (
          <div className="flex items-center justify-center p-2">
            <Spinner />
          </div>
        ) : (
          <Button
            className="mt-4"
            onClick={createAboutHandler}
            disabled={loadingCreate}
          >
            Create About Template
          </Button>
        )}
      </div>
    </div>
  )
}
