"use client"

import Image from "next/image"
import { Note } from "@prisma/client"
import { FormEvent, useRef } from "react"
import { useRouter } from "next/navigation"

export default function Notes({ notes }: { notes: Note[] }) {
  const router = useRouter()

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

    if (title && description) {
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
          }),
        })
      } catch (error) {
        console.error(error)
      }

      titleRef.current!.value = ""
      descriptionRef.current!.value = ""
      imageRef.current!.value = ""
      linkRef.current!.value = ""

      router.refresh()
    }
  }

  // const updatePublishedHandler = async (id: number, isPublished: boolean) => {
  //   try {
  //     await fetch("/api/admin/notes", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id,
  //         isPublished,
  //       }),
  //     })
  //   } catch (error) {
  //     console.error(error)
  //   }

  //   router.refresh()
  // }

  const deleteNoteHandler = async (id: number) => {
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
    } catch (error) {
      console.error(error)
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
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex flex-col items-center justify-center"
          >
            {note.image && (
              <Image
                src={note.image}
                alt={note.title}
                width={200}
                height={200}
              />
            )}
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            {note.link && (
              <p>
                Link:{" "}
                <a href={note.link} target="_blank" rel="noopener noreferrer">
                  {note.link}
                </a>
              </p>
            )}
            <button onClick={() => deleteNoteHandler(note.id)}>Delete</button>
          </div>
        ))}
      </div>
      <h2 className="text-lg drop-shadow">Create a new note!</h2>
      <span className="text-sm drop-shadow">
        The image and link are optional.
      </span>
      <form onSubmit={submitHandler} className="flex flex-col items-center">
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
        {/* <label htmlFor="isPublished">Published</label>
        <input
          type="checkbox"
          name="isPublished"
          id="isPublished"
          ref={isPublishedRef}
        /> */}
        <label htmlFor="link">Link</label>
        <input
          type="text"
          name="link"
          id="link"
          ref={linkRef}
          className="mb-2 w-1/2"
        />
        <button type="submit" className="primary-button">
          Create
        </button>
      </form>
    </div>
  )
}
