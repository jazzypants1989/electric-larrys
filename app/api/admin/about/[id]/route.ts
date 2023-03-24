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
    return NextResponse.json({ message: "Invalid about id" }, { status: 400 })
  }

  const about = await db.about.findUnique({
    where: {
      id: id,
    },
  })
  const body = await request.json()

  if (!body) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    )
  }

  const { title, description, heroImage, heroText, otherImages, isPublished } =
    body

  console.log(otherImages)

  const onlyRealImages = otherImages.filter((image: string) => image !== "")

  console.log(onlyRealImages)

  if (about) {
    await db.about.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        heroImage: heroImage,
        heroText: heroText,
        otherImages: onlyRealImages,
        isPublished: isPublished,
      },
    })
    return NextResponse.json({ message: "About updated successfully" })
  } else {
    return NextResponse.json({ message: "About not found" }, { status: 404 })
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
    return NextResponse.json({ message: "Invalid about id" }, { status: 400 })
  }

  const about = await db.about.findUnique({
    where: {
      id: id,
    },
  })

  if (about) {
    await db.about.delete({
      where: {
        id: id,
      },
    })
    return NextResponse.json({
      message: `About template: ${about.title} deleted successfully`,
    })
  } else {
    return NextResponse.json({ message: "About not found" }, { status: 404 })
  }
}
