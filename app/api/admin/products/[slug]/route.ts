import { getCurrentUser } from "../../../../../utils/session"
import { NextRequest, NextResponse } from "next/server"
import db from "../../../../../utils/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const user = await getCurrentUser()

  if (!user || (user && !user.isEmployee)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const { slug } = params

  const product = await db.product.findUnique({
    where: { slug },
  })

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const user = await getCurrentUser()

  if (!user || (user && !user.isEmployee)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const { slug } = params

  const {
    name,
    description,
    price,
    category,
    tags,
    image,
    isFeatured,
    isOnSale,
    salePrice,
    countInStock,
  } = await request.json()

  // // data validation
  if (!name || !description || !price || !category || !tags || !image) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    )
  }

  // if tags is not an array
  if (!Array.isArray(tags)) {
    return NextResponse.json(
      { message: "Tags must be an array" },
      { status: 400 }
    )
  }

  if (tags.length < 1) {
    return NextResponse.json(
      { message: "At least one tag is required" },
      { status: 400 }
    )
  }

  if (price < 0 || salePrice < 0) {
    return NextResponse.json(
      { message: "Price and sale price must be greater than 0" },
      { status: 400 }
    )
  }

  if (countInStock < 0) {
    return NextResponse.json(
      { message: "Count in stock must be greater than 0" },
      { status: 400 }
    )
  }

  if (typeof isFeatured !== "boolean" || typeof isOnSale !== "boolean") {
    return NextResponse.json(
      { message: "isFeatured and isOnSale must be boolean" },
      { status: 400 }
    )
  }

  if (isOnSale && !salePrice) {
    return NextResponse.json(
      { message: "Sale price must be provided" },
      { status: 400 }
    )
  }

  const product = await db.product.findUnique({
    where: { slug: slug },
  })

  if (product) {
    await db.product.update({
      where: { slug: slug },
      data: {
        name,
        description,
        price,
        category,
        tags,
        image,
        isFeatured,
        isOnSale,
        salePrice,
        countInStock,
      },
    })

    return NextResponse.json({ message: "Product updated successfully" })
  } else {
    return NextResponse.json(
      { message: `Product with slug ${slug} not found` },
      { status: 404 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const user = await getCurrentUser()

  if (!user || (user && !user.isEmployee)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const { slug } = params

  const product = await db.product.findUnique({
    where: { slug: slug },
  })

  if (product) {
    await db.product.delete({
      where: { slug: slug },
    })

    return NextResponse.json({ message: "Product deleted successfully" })
  } else {
    return NextResponse.json(
      { message: `Product with slug ${slug} not found` },
      { status: 404 }
    )
  }
}
