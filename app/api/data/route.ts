import { NextResponse } from "next/server"

export const revalidate = 1

export async function GET() {
  const data = await fetch("https://fakestoreapi.com/products")
  const json = await data.json()
  return NextResponse.json(json)
}
