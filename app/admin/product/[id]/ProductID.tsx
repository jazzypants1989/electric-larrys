"use client"

import Image from "next/image"
import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import useToast from "../../../../utils/useToast"

import type { Product } from "@/types"

export default function ProductID({ product }: { product: Product }) {
  const addToast = useToast()
  const router = useRouter()

  const { id } = product

  const { name, image, slug } = product

  const [newSlug, setSlug] = useState(slug)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value)
  }

  const handleSlugSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newSlug === slug) {
      addToast("Slug is already set to " + newSlug, false)
      return
    }

    setLoading(true)

    const res = await fetch(`/api/admin/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: newSlug }),
    })

    if (res.status === 200) {
      addToast("Slug updated successfully", true)
      setLoading(false)
      router.refresh()
      router.push(`/admin/products/${newSlug}`)
    } else {
      setLoading(false)
      setError("Error updating slug")
      const { message } = await res.json()
      addToast(message, false)
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center text-center">
      <h1 className="text-2xl font-bold">{name}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Image src={image} alt={name} width={200} height={200} />
      <form onSubmit={handleSlugSubmit}>
        <label htmlFor="slug" className="text-lg font-bold">
          Slug
        </label>
        <input
          type="text"
          className="h-10 w-5/6 rounded-md border-2 border-orange p-2"
          placeholder="Enter a slug for this product"
          value={newSlug}
          onChange={handleSlugChange}
        />
        {loading ? (
          <h3 className="animate-pulse text-lg text-orange">Loading...</h3>
        ) : (
          <button
            type="submit"
            className="m-2 rounded-md border-2 border-Green bg-Green p-2 text-orange"
          >
            {slug.length > 0 ? "Update Slug to " + newSlug : "Create Slug"}
          </button>
        )}
      </form>
    </div>
  )
}
