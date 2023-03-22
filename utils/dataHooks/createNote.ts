import { User } from "@prisma/client"
import db from "../../utils/prisma"

export async function createNote({
  title,
  description,
  image,
  isPublished,
  link,
  User,
}: {
  title: string
  description: string
  image?: string
  isPublished?: boolean
  link?: string
  User: User
}) {
  if (!title) throw new Error("Title is required")
  if (!description) throw new Error("Description is required")
  if (!User) throw new Error("User is required")
  if (!User.email) throw new Error("User email is required")
  const note = await db.note.create({
    data: {
      title,
      description,
      image,
      isPublished,
      link,
      User: { connect: { id: User.id, email: User.email } },
    },
  })
  return note
}

export async function updateNote({
  isPublished,
  id,
}: {
  isPublished: boolean
  id: string
}) {
  const note = await db.note.update({
    where: { id },
    data: { isPublished },
  })
  return note
}

export async function deleteNote({ id }: { id: string }) {
  const note = await db.note.delete({
    where: { id },
  })
  return note
}
