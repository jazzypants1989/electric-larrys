"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useReducer } from "react"
import { useAtom } from "jotai"

import toastStore from "../../../utils/ToastStore"
import type { Product } from "../../../utils/dataHooks/getProducts"

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

const randomID = Math.random().toString(36).substring(2, 15)

export default function AdminProductsScreen({
  products,
}: {
  products: Product[]
}) {
  const router = useRouter()
  const [, setToasts] = useAtom(toastStore)

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
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: product.id,
            message: `Product ${product.name} created successfully`,
            success: true,
          },
        ],
      }))
      router.push(`/admin/products/${product.slug}`)
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" })
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: `Sorry, something went wrong`,
            success: false,
          },
        ],
      }))
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
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: slug,
            message: `Product deleted successfully`,
            success: true,
          },
        ],
      }))
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" })
      setToasts((prev) => ({
        ...prev,
        toasts: [
          ...prev.toasts,
          {
            id: randomID,
            message: `Sorry, something went wrong`,
            success: false,
          },
        ],
      }))
    }
  }

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" })
      router.refresh()
    }
  }, [successDelete, router])

  return (
    <div className="overflow-x-auto md:col-span-3">
      <div className="m-2 flex items-center justify-between">
        <h1 className="mb-4 text-xl">Products</h1>
        {loadingDelete && <div>Deleting item...</div>}
        <button
          disabled={loadingCreate}
          onClick={createHandler}
          className="primary-button"
        >
          {loadingCreate ? "Loading" : "Create One"}
        </button>
        <button
          disabled={loadingCreate}
          onClick={() => router.push("/admin/products/import")}
          className="primary-button"
        >
          Import a CSV
        </button>
      </div>
      <div className="overflow-auto rounded-lg border-b shadow">
        <table className="min-w-full overflow-x-auto">
          <thead className="border-b bg-orange">
            <tr>
              <th
                className="border-r-2 border-r-orange text-center md:px-4
              "
              >
                NAME
              </th>
              <th
                className="border-r-2 border-r-orange text-center md:px-4
              "
              >
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
                  {!product.isFeatured ? "❌" : "💯"}
                </td>
                <td className=" text-center ">
                  <Link
                    href={`/admin/products/${product.slug}`}
                    type="button"
                    className="primary-button"
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteHandler(product.slug)}
                    className="default-button hover:bg-Red"
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
