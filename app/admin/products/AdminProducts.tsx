"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useReducer } from "react"
import Button from "../../../components/Layout/Button"
import type { Product } from "../../../utils/dataHooks/getProducts"
import useToast from "../../../utils/useToast"

type State = {
  loadingCreate: boolean
  loadingDelete: boolean
  successDelete: boolean
}

type Action =
  | { type: "CREATE_REQUEST" }
  | { type: "CREATE_SUCCESS" }
  | { type: "CREATE_FAIL" }
  | { type: "DELETE_REQUEST" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_FAIL" }
  | { type: "DELETE_RESET" }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true }
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false }
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false }
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true }
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true }
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false }
    case "DELETE_RESET":
      return { ...state, successDelete: false }
    default:
      return state
  }
}

export default function AdminProductsScreen({
  products,
}: {
  products: Product[]
}) {
  const router = useRouter()
  const addToast = useToast()

  const [state, dispatch] = useReducer(reducer, {
    loadingCreate: false,
    loadingDelete: false,
    successDelete: false,
  })

  const { loadingCreate, loadingDelete, successDelete } = state

  const createHandler = async () => {
    if (!window.confirm("This will create a dummy product. Continue?")) {
      return
    }
    try {
      dispatch({ type: "CREATE_REQUEST" })
      const data = await fetch("/api/admin/products", {
        method: "POST",
      })
      const product: Product = await data.json()
      dispatch({ type: "CREATE_SUCCESS" })
      addToast(`Product ${product.name} created successfully`, true)
      router.refresh()
      router.push(`/admin/products/${product.slug}`)
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" })
      addToast(`Sorry, something went wrong.. ${err}`, false)
    }
  }

  const deleteHandler = async (slug: string) => {
    if (!window.confirm("Are you sure?")) {
      return
    }
    try {
      dispatch({ type: "DELETE_REQUEST" })
      await fetch(`/api/admin/products/${slug}`, {
        method: "DELETE",
      })
      dispatch({ type: "DELETE_SUCCESS" })
      addToast(`Product with slug: ${slug} deleted successfully`, true)
      router.refresh()
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" })
      addToast(`Sorry, something went wrong.. ${err}`, false)
    }
  }

  const exportHandler = async () => {
    fetch("/api/admin/products/export", {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "products.csv")

        // Append to html link element page
        document.body.appendChild(link)

        // Start download
        link.click()

        // Clean up and remove the link
        link.parentNode?.removeChild(link)
      })
  }

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" })
      router.refresh()
    }
  }, [successDelete, router])

  return (
    <div className="overflow-x-auto md:col-span-3">
      <div className="m-2 flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
        <h1 className="text-xl">Products</h1>
        {loadingDelete && <div>Deleting item...</div>}
        <Button disabled={loadingCreate} onClick={createHandler}>
          {loadingCreate ? "Loading" : "Create One"}
        </Button>
        <Button
          disabled={loadingCreate}
          onClick={() => router.push("/admin/products/import")}
        >
          {loadingCreate ? "Loading..." : "Import a CSV"}
        </Button>
        <Button disabled={loadingCreate} onClick={exportHandler}>
          {loadingCreate ? "Loading..." : "Export a CSV"}
        </Button>
      </div>
      <div className="overflow-auto rounded-lg border-b shadow">
        <table className="min-w-full overflow-x-auto">
          <thead className="border-b bg-orange">
            <tr>
              <th className="border-r-2 border-r-orange text-center md:px-4">
                NAME
              </th>
              <th className="border-r-2 border-r-orange text-center md:px-4">
                SLUG
              </th>
              <th className="border-r-2 border-r-orange text-center md:px-2">
                PRICE
              </th>
              <th className="border-r-2 border-r-orange text-center md:px-2">
                CATEGORY
              </th>
              <th className="border-r-2 border-r-orange text-center md:px-2">
                TAGS
              </th>
              <th className="text-center md:px-2">COUNT IN STOCK</th>
              <th className="text-center md:px-2">FEATURED</th>
              <th className="text-center md:px-2">ON SALE</th>
              <th className="text-center md:px-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product.id} className="border-b">
                <td className="border-r-2 border-r-orange text-center md:px-4">
                  {product.name}
                </td>
                <td className="border-r-2 border-r-orange text-center md:px-4">
                  {product.slug}
                </td>
                <td className="border-r-2 border-r-orange text-center md:px-4">
                  ${product.price}
                </td>
                <td className="border-r-2 border-r-orange text-center md:px-4">
                  {product.category}
                </td>
                <td className="border-r-2 border-r-orange text-center md:px-4">
                  {product.tags.join(", ")}
                </td>
                <td className="border-r-2 border-r-orange text-center md:px-4">
                  {product.countInStock}
                </td>
                <td className="border-r-2 border-r-orange text-center md:px-4">
                  {product.isFeatured ? "💯" : "❌"}
                </td>
                <td className="border-r-2 border-r-orange text-center md:px-4">
                  {product.isOnSale ? "💯" : "❌"}
                </td>
                <td className="text-center">
                  <Button
                    onClick={() =>
                      router.push(`/admin/products/${product.slug}`)
                    }
                    className="m-1"
                    type="button"
                  >
                    <Link href={`/admin/products/${product.slug}`}>Edit</Link>
                  </Button>
                  <Button
                    onClick={() => deleteHandler(product.slug)}
                    className="m-1 bg-Red hover:text-Red"
                    type="button"
                    disabled={loadingDelete}
                  >
                    {loadingDelete ? "Deleting..." : "Delete"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
