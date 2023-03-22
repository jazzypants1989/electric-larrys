import { getCurrentUser } from "../../../../../utils/session"
import { NextRequest, NextResponse } from "next/server"
import db from "../../../../../utils/prisma"

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) {
  const user = await getCurrentUser()
  if (!user || (user && !user.isEmployee)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const { id } = params

  if (!id) {
    return NextResponse.json(
      { message: "Invalid announcement id" },
      { status: 400 }
    )
  }

  const announcement = await db.announcement.findUnique({
    where: {
      id: id,
    },
  })

  const body = await request.json()

  const { title, description, link, isPublished } = body

  if (announcement) {
    await db.announcement.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        link: link,
        isPublished: isPublished,
      },
    })
    return NextResponse.json({ message: "Announcement updated successfully" })
  } else {
    return NextResponse.json(
      { message: "Announcement not found" },
      { status: 404 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) {
  const user = await getCurrentUser()
  if (!user || (user && !user.isEmployee)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const { id } = params

  if (!id) {
    return NextResponse.json(
      { message: "Invalid announcement id" },
      { status: 400 }
    )
  }

  const announcement = await db.announcement.findFirst({
    where: {
      id: id,
    },
  })

  if (announcement) {
    await db.announcement.delete({
      where: {
        id: id,
      },
    })
    return NextResponse.json({ message: "Announcement deleted successfully" })
  } else {
    return NextResponse.json(
      { message: "Announcement not found" },
      { status: 404 }
    )
  }
}
