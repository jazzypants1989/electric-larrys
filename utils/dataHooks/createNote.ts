import db from "../../utils/prisma"

export async function createNote({
  title,
  description,
  image,
  isPublished,
  link,
}: {
  title: string
  description: string
  image?: string
  isPublished?: boolean
  link?: string
}) {
  const note = await db.note.create({
    data: {
      title,
      description,
      image,
      isPublished,
      link,
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
