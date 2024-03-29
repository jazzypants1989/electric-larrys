import { NextResponse } from "next/server"
import db from "../../../../../utils/prisma"
import { getCurrentUser } from "../../../../../utils/session"

export async function DELETE() {
  const employee = await getCurrentUser()

  if (!employee || (employee && !employee.isAdmin)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }
  const products = await db.product.deleteMany({
    where: {
      countInStock: 0,
    },
  })

  const message =
    products.count > 0
      ? `I killed them all with no remorse. There were ${products.count} victims.`
      : "There were no potential victims."

  return new Response(
    JSON.stringify({
      message,
    }),
    {
      status: 200,
    }
  )
}
