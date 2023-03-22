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
    return NextResponse.json({ message: "Invalid product id" }, { status: 400 })
  }

  const product = await db.product.findUnique({
    where: {
      id: id,
    },
  })

  if (product) {
    return NextResponse.json(product)
  }

  return NextResponse.json({ message: "Product not found" }, { status: 404 })
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
    return NextResponse.json({ message: "Invalid product id" }, { status: 400 })
  }

  const product = await db.product.findUnique({
    where: {
      id: id,
    },
  })

  const data = await request.json()

  const slug = data.slug

  if (product) {
    const updatedProduct = await db.product.update({
      where: {
        id: id,
      },
      data: {
        slug: slug,
      },
    })
    return NextResponse.json(updatedProduct)
  } else {
    return NextResponse.json({ message: "Product not found" }, { status: 404 })
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
    return NextResponse.json({ message: "Invalid product id" }, { status: 400 })
  }

  const product = await db.product.findUnique({
    where: {
      id: id,
    },
  })

  if (product) {
    const deletedProduct = await db.product.delete({
      where: {
        id: id,
      },
    })
    return NextResponse.json(deletedProduct)
  } else {
    return NextResponse.json({ message: "Product not found" }, { status: 404 })
  }
}
