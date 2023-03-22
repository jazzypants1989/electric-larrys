import { NextRequest, NextResponse } from "next/server"
import db from "../../../utils/prisma"

export async function GET() {
  const users = await db.user.findMany({
    select: {
      email: true,
      newsletter: true,
    },
  })
  return NextResponse.json(users)
}

export async function PUT(req: NextRequest) {
  const { email, newsletter } = await req.json()

  try {
    const user = (await db.user.update({
      where: { email },
      data: { newsletter },
    })) as { email: string; newsletter: boolean }
    console.log(user)

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(error)
  }
}
