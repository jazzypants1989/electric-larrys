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
  const employee = await getCurrentUser()

  if (!employee || (employee && !employee.isAdmin)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const { id } = params

  if (!id) {
    return NextResponse.json({ message: "Invalid user id" }, { status: 400 })
  }

  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  })
  if (user) {
    return NextResponse.json(user)
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }
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
  const employee = await getCurrentUser()

  if (!employee || (employee && !employee.isAdmin)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const { id } = params

  if (!id) {
    return NextResponse.json({ message: "Invalid user id" }, { status: 400 })
  }

  const { name, email, isAdmin, isEmployee, newsletter } = await request.json()

  const user = await db.user.update({
    where: {
      id: id,
    },
    data: {
      name,
      email,
      isAdmin,
      isEmployee,
      newsletter,
    },
  })
  if (user) {
    return NextResponse.json(user)
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
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
  const user = await db.user.delete({
    where: {
      id: params.id,
    },
  })
  if (user) {
    return NextResponse.json(user)
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }
}
