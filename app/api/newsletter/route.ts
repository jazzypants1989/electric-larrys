import { NextResponse } from "next/server"
import db from "../../../utils/prisma"

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 })
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    const newUser = await db.user.create({
      data: {
        email,
        newsletter: true,
      },
    })
    console.log(newUser)
    return NextResponse.json({ message: "Thanks for signing up!" })
  }

  if (user.newsletter) {
    return NextResponse.json({ message: "You are already signed up!" })
  }

  const updatedUser = await db.user.update({
    where: {
      email,
    },
    data: {
      newsletter: true,
    },
  })

  console.log(updatedUser)

  return NextResponse.json({ message: "Thanks for signing up!" })
}
