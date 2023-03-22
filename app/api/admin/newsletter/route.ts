import { getCurrentUser } from "../../../../utils/session"
import { NextResponse, NextRequest } from "next/server"
import db from "../../../../utils/prisma"
// @ts-ignore
import Email from "../../../../utils/email"

const client = require("@sendgrid/client")
client.setApiKey(`${process.env.NEXT_PUBLIC_SENDGRID_API_KEY}`)

export async function GET() {
  const users = await db.user.findMany({
    where: {
      newsletter: true,
    },
  })
  return NextResponse.json(users)
}

export async function PUT(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user || (user && !user.isEmployee)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const body = await request.json()

  const req = {
    method: "PUT",
    url: "/v3/marketing/contacts",
    body: body,
  }

  client
    .request(req)
    .then(([response, body]: any) => {
      console.log(response.statusCode)
      console.log(body)
    })
    .catch((error: any) => {
      console.log(error.response.statusCode)
    })

  return NextResponse.json({ message: "Newsletter updated successfully" })
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

  const { subject, message, link, image } = body

  const users = await db.user.findMany({
    where: {
      newsletter: true,
    },
  })

  const antiSpamTimeout = 1000

  for (const user of users) {
    await new Email(user, subject, message, link, image).sendEmail()
    await new Promise((resolve) => setTimeout(resolve, antiSpamTimeout))
  }

  return NextResponse.json({ message: "Emails sent successfully" })
}
