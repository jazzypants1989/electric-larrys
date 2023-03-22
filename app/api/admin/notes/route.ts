import { NextRequest, NextResponse } from "next/server"
import { getNotes } from "../../../../utils/dataHooks/getNotes"
import {
  createNote,
  updateNote,
  deleteNote,
} from "../../../../utils/dataHooks/createNote"
import { getCurrentUser } from "../../../../utils/session"

// This one isn't really used, but may as well have it here for completeness
export async function GET() {
  const notes = await getNotes()
  return NextResponse.json(notes)
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()

  if (!user || (user && !user.isEmployee)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const data = await request.json()
  const note = await createNote(data)
  return NextResponse.json(note)
}

export async function DELETE(request: NextRequest) {
  const user = await getCurrentUser()

  if (!user || (user && !user.isAdmin)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const data = await request.json()
  const note = await deleteNote(data)
  return NextResponse.json(note)
}

// Ahh shucks, let's just do a whole dang CRUD thing
export async function PUT(request: NextRequest) {
  const data = await request.json()
  const note = await updateNote(data)
  return NextResponse.json(note)
}
