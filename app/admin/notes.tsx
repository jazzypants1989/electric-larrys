"use client"

import { FormEvent, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import useToast from "../../utils/useToast"
import { User } from "../../utils/dataHooks/getUserByID"
import Button from "../../components/Layout/Button"

type Note = {
  id: string | null
  title: string | null
  description: string | null
  image: string | null
  link: string | null
  isPublished: boolean | null
}

export default function Notes({ notes, user }: { notes: Note[]; user: User }) {
  const router = useRouter()
  const addToast = useToast()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const title = titleRef.current?.value
    const description = descriptionRef.current?.value
    const image = imageRef.current?.value
    const link = linkRef.current?.value

    if (!title) {
      addToast("Title is required", false)
      setError("Title is required")
      titleRef.current!.focus()
      titleRef.current!.select()
      return
    }

    if (!description) {
      addToast("Description is required", false)
      setError("Description is required")
      descriptionRef.current!.focus()
      descriptionRef.current!.select()
      return
    }

    if (title && description) {
      setLoading(true)
      try {
        await fetch("/api/admin/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            image,
            link,
            User: user,
          }),
        })
        addToast("Note created", true)
        setLoading(false)
      } catch (error) {
        console.error(error)
        addToast("Note creation failed", false)
        setLoading(false)
      }

      titleRef.current!.value = ""
      descriptionRef.current!.value = ""
      imageRef.current!.value = ""
      linkRef.current!.value = ""

      router.refresh()
    }
  }

  const deleteNoteHandler = async (id: string | null) => {
    if (!id) return
    if (!window.confirm("Are you sure you want to delete this note?")) return
    try {
      await fetch("/api/admin/notes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      })
      addToast("Note deleted", true)
    } catch (error) {
      console.error(error)
      addToast("Note deletion failed", false)
    }

    router.refresh()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl drop-shadow">Notes</h1>
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-xl drop-shadow">
          {notes.length} {notes.length === 1 ? "Note" : "Notes"}
        </h3>
        {notes.map((note: Note) => (
          <div
            key={note.id}
            className="m-2 flex flex-col items-center justify-center rounded-md border-2 border-Yellow p-2"
          >
            {note.image && (
              <img // eslint-disable-line @next/next/no-img-element
                src={note.image}
                alt="Note Image"
                width={200}
                height={200}
                className="rounded-lg border-b-2 border-Yellow p-2"
              />
            )}
            <h1 className="text-lg drop-shadow">{note.title}</h1>
            <p className="text-sm drop-shadow">{note.description}</p>
            {note.link && (
              <p>
                Link:{" "}
                <a
                  className="text-orange drop-shadow hover:text-Red"
                  href={note.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {note.link}
                </a>
              </p>
            )}
            {/** @ts-ignore */}
            {note.User && (
              <p className="text-sm drop-shadow">
                {/** @ts-ignore */}
                Created by: {note.User.name}
              </p>
            )}
            {user?.isAdmin && (
              <Button
                className="m-1 bg-Red hover:text-Red"
                onClick={() => deleteNoteHandler(note!.id)}
              >
                Delete
              </Button>
            )}
          </div>
        ))}
      </div>
      <h2 className="text-lg drop-shadow">Create a new note!</h2>
      <span className="text-sm drop-shadow">
        The image and link are optional.
      </span>
      <form onSubmit={submitHandler} className="flex flex-col items-center">
        {error && <span className="text-sm text-Red">{error}</span>}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          ref={titleRef}
          className="mb-2 w-1/2"
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          ref={descriptionRef}
          rows={5}
          cols={50}
          className="mb-2"
        />
        <label htmlFor="image">Image</label>
        <input
          type="text"
          name="image"
          id="image"
          ref={imageRef}
          className="mb-2 w-1/2"
        />
        <label htmlFor="link">Link</label>
        <input
          type="text"
          name="link"
          id="link"
          ref={linkRef}
          className="mb-2 w-1/2"
        />
        {loading ? (
          <h3 className="text-lg drop-shadow">Loading...</h3>
        ) : (
          <Button type="submit" className="mb-2">
            Create
          </Button>
        )}
      </form>
    </div>
  )
}
