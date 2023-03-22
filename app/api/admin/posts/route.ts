import { getCurrentUser } from "../../../../utils/session"
import { NextResponse } from "next/server"
import db from "../../../../utils/prisma"

export async function POST() {
  const user = await getCurrentUser()

  if (!user || (user && !user.isEmployee)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const newSliderPost = await db.post.create({
    data: {
      title: "sample title",
      link: "",
      image: "",
      description: "sample description",
      isPublished: false,
      isFeatured: false,
    },
  })

  return NextResponse.json(newSliderPost)
}
