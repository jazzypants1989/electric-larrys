import Button from "./button"
import db from "../utils/prisma"
import { Suspense } from "react"

export const revalidate = 10

export type ProductsType = Awaited<ReturnType<typeof getProducts>>

async function getProducts() {
  console.log("getProducts")
  const products = await db.product.findMany()
  return products
}

async function getUsers() {
  console.log("getUsers")
  const users = await db.user.findMany()
  return users
}

async function getNotes() {
  console.log("getNotes")
  const notes = await db.note.findMany()
  return notes
}

export default async function Route() {
  const products = await getProducts()
  const users = await getUsers()
  const notes = await getNotes()
  return (
    <>
      <Button />
      <div className="m-auto flex min-h-screen flex-col items-center justify-center bg-orange p-4">
        Products:
        <Suspense fallback={<div>loading</div>}>
          {products.map((product) => (
            <div key={product.id} className="rounded bg-blue p-4 text-Red">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
            </div>
          ))}
        </Suspense>
        Users:
        <Suspense fallback={<div>loading</div>}>
          {users.map((user) => (
            <div key={user.id} className="rounded bg-blue p-4 text-Red">
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </div>
          ))}
        </Suspense>
        Notes:
        <Suspense fallback={<div>loading</div>}>
          {notes.map((note) => (
            <div key={note.id} className="text-Blue rounded bg-Red p-4">
              <h1>{note.title}</h1>
            </div>
          ))}
        </Suspense>
      </div>
    </>
  )
}
