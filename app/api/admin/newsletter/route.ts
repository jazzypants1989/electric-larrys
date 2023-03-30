import { getCurrentUser } from "../../../../utils/session"
import { NextResponse, NextRequest } from "next/server"
import db from "../../../../utils/prisma"
// @ts-ignore
import Email from "../../../../utils/email"

export async function GET() {
  const users = await db.user.findMany({
    where: {
      newsletter: true,
    },
  })
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()

  if (!user || (user && !user.isEmployee)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const body = await request.json()

  if (!body) {
    return NextResponse.json(
      { message: "You didn't give me a dang thing to send" },
      { status: 400 }
    )
  }

  const { users, subject, message, link, image } = body

  if (!users) {
    return NextResponse.json(
      { message: "You didn't give me any users to send to" },
      { status: 400 }
    )
  }

  if (!subject) {
    return NextResponse.json(
      { message: "You didn't give me a subject" },
      { status: 400 }
    )
  }

  if (!message) {
    return NextResponse.json(
      { message: "You didn't give me a message" },
      { status: 400 }
    )
  }

  if (!link) {
    return NextResponse.json(
      { message: "You didn't give me a link" },
      { status: 400 }
    )
  }

  if (!image) {
    return NextResponse.json(
      { message: "You didn't give me an image" },
      { status: 400 }
    )
  }

  const antiSpamTimeout = 1000

  if (users === "ALL") {
    const users = await db.user.findMany({
      where: {
        newsletter: true,
      },
    })

    for (const user of users) {
      if (!user.name) {
        const emailName = user.email?.split("@")[0]
        user.name = emailName || "there"
      }

      await new Email(user, subject, message, link, image).sendEmail()
      await new Promise((resolve) => setTimeout(resolve, antiSpamTimeout))
    }
  } else {
    for (let user of users) {
      user = JSON.parse(user)
      if (!user.name) {
        const emailName = user.email?.split("@")[0]
        user.name = emailName || "there"
      }
      await new Email(user, subject, message, link, image).sendEmail()
      await new Promise((resolve) => setTimeout(resolve, antiSpamTimeout))
    }
  }

  return NextResponse.json({ message: "Emails sent successfully" })
}
