import { getCurrentUser } from "../../../../../utils/session"
import { NextRequest, NextResponse } from "next/server"
import db from "../../../../../utils/prisma"

export async function GET(
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
    return NextResponse.json({ message: "Invalid post id" }, { status: 400 })
  }

  const post = await db.post.findUnique({
    where: {
      id: id,
    },
  })

  if (post) {
    return NextResponse.json(post)
  }

  return NextResponse.json({ message: "Post not found" }, { status: 404 })
}

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
    return NextResponse.json({ message: "Invalid post id" }, { status: 400 })
  }

  const post = await db.post.findUnique({
    where: {
      id: id,
    },
  })

  const body = await request.json()

  const { title, description, link, isPublished, image, isFeatured } = body

  if (post) {
    await db.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        link: link,
        isPublished: isPublished,
        image: image,
        isFeatured: isFeatured,
      },
    })
    return NextResponse.json({ message: "Post updated successfully" })
  } else {
    return NextResponse.json({ message: "Post not found" }, { status: 404 })
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
    return NextResponse.json({ message: "Invalid post id" }, { status: 400 })
  }

  const post = await db.post.findFirst({
    where: {
      id: id,
    },
  })

  if (post) {
    await db.post.delete({
      where: {
        id: id,
      },
    })
    return NextResponse.json({ message: "Post deleted successfully" })
  } else {
    return NextResponse.json({ message: "Post not found" }, { status: 404 })
  }
}
