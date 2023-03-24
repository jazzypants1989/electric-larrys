import { getCurrentUser } from "../../../../utils/session"
import { NextResponse } from "next/server"
import db from "../../../../utils/prisma"

const title = "About Electric Larry's"
const heroImage = "/images/bg1.jpg"
const heroText =
  "This is the about page. It's full of amazing copy that will make you want to buy our products."
const description =
  "Have we mentioned that we have the best products in the world? We do. We also are super moral and very friendly. Basically, we're the best."
const otherImages = [
  "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403245/toys.jpg",
  "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403245/games.jpg",
  "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403245/318657359_1319492078883086_4891519022965311904_n_icfdeo.jpg",
]

export async function POST() {
  const user = await getCurrentUser()
  if (!user || (user && !user.isAdmin)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const newAbout = await db.about.create({
    data: {
      title: title,
      description: description,
      heroImage: heroImage,
      heroText: heroText,
      otherImages: otherImages,
      isPublished: false,
    },
  })

  return NextResponse.json({
    message: "About created successfully",
    about: newAbout,
  })
}
