import { getCurrentUser } from "../../../../utils/session"
import { NextResponse } from "next/server"
import db from "../../../../utils/prisma"

export async function POST() {
  const employee = await getCurrentUser()

  if (!employee || (employee && !employee.isAdmin)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const user = await db.user.create({
    data: {
      name: "New Employee",
      email: "their@email.com",
      isAdmin: false,
      isEmployee: true,
      newsletter: true,
    },
  })
  if (user) {
    return NextResponse.json(user)
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }
}
