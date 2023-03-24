"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useReducer } from "react"

import Button from "../../../components/Layout/Button"
import useToast from "../../../utils/useToast"

import type { IAnnouncement } from "../../../utils/dataHooks/getAllAnnouncements"

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

export default function Announcements({
  announcements,
}: {
  announcements: IAnnouncement[]
}) {
  const router = useRouter()
  const addToast = useToast()

  const [state, dispatch] = useReducer(reducer, {
    loadingCreate: false,
    loadingDelete: false,
    successDelete: false,
  })

  const { loadingCreate, loadingDelete, successDelete } = state

  const createAnnouncementHandler = async () => {
    if (!window.confirm("Create a new announcement?")) return
    try {
      dispatch({ type: "CREATE_REQUEST" })
      const data = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
      const { announcement } = data
      dispatch({ type: "CREATE_SUCCESS" })
      addToast("Announcement created successfully", true)
      router.push(`/admin/announcements/${announcement.id}`)
    } catch (error) {
      dispatch({ type: "CREATE_FAIL" })
      addToast("Failed to create announcement", false)
    }
  }

  const deleteAnnouncementHandler = async (id: string) => {
    if (!window.confirm("Delete this announcement?")) return
    try {
      dispatch({ type: "DELETE_REQUEST" })
      await fetch(`/api/admin/announcements/${id}`, {
        method: "DELETE",
      })
      dispatch({ type: "DELETE_SUCCESS" })
      addToast("Announcement deleted successfully", true)
      router.refresh()
    } catch (error) {
      dispatch({ type: "DELETE_FAIL" })
      addToast("Failed to delete announcement", false)
    }
  }

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" })
    }
  }, [successDelete])

  return (
    <div className="w-full overflow-x-auto drop-shadow md:col-span-3">
      <div className="m-2 flex flex-col items-center justify-between md:flex-row">
        <h1 className="mx-auto mb-4 text-xl">Announcements</h1>
        {loadingDelete && <div>Deleting item...</div>}
        <Button onClick={createAnnouncementHandler} disabled={loadingCreate}>
          Create Announcement
        </Button>
      </div>
      <table className="mx-auto w-full table-auto">
        <thead className="m-6 border-b p-4">
          {announcements.length > 0 && (
            <tr className="mt-2">
              <th className="w-1/2">Title</th>
              <th className="w-1/2">Description</th>
              <th className="w-1/2">Link</th>
              <th className="w-1/2">Published</th>
              <th className="w-1/2">Actions</th>
            </tr>
          )}
        </thead>
        {announcements.length === 0 && (
          <tr className="mt-2">
            <td className="w-full border-b p-4">No announcements found.</td>
          </tr>
        )}
        <tbody>
          {announcements.map((announcement: IAnnouncement) => (
            <tr key={announcement?.id}>
              <td className="border-b p-4">{announcement?.title}</td>
              <td className="border-b p-4">{announcement?.description}</td>
              <td className="border-b p-4 text-lg">
                {!announcement?.link ? "❌" : "💯"}
              </td>
              <td className="border-b p-4 text-lg">
                {!announcement?.isPublished ? "❌" : "💯"}
              </td>
              <td className="border-b p-4">
                <Link
                  passHref
                  href={`/admin/announcements/${announcement?.id}`}
                >
                  <Button>Edit</Button>
                </Link>
                <Button
                  className="bg-Red"
                  onClick={() => {
                    if (announcement?.id) {
                      deleteAnnouncementHandler(announcement.id)
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
