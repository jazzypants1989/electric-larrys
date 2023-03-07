"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Product, Products } from "../../../utils/dataHooks/getProducts"
import BiSearchAlt from "./Icons/BiSearchAlt"

export default function Search({
  placeholder,
  query,
}: {
  placeholder: string
  query?: string
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Products | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef(null)

  const doSearch = useMemo(() => {
    return async () => {
      try {
        setSearchLoading(true)
        const res = await fetch(`/api/search?search=${searchTerm}`)
        const data = await res.json()
        setSearchResults(data)
        setSearchLoading(false)
      } catch (err) {
        setSearchLoading(false)
      }
    }
  }, [searchTerm])

  type Timeout = ReturnType<typeof setTimeout>

  const debouncedSearch = useMemo(() => {
    function debounce(func: () => void, wait: number) {
      let timeout: Timeout
      return function executedFunction() {
        const later = () => {
          clearTimeout(timeout)
          func()
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    }

    return debounce(doSearch, 500)
  }, [doSearch])

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch()
    } else {
      setSearchResults([])
    }
  }, [searchTerm, debouncedSearch])

  useEffect(() => {
    if (query) {
      setSearchTerm(query)
    }
  }, [query])

  return (
    <div className="relative z-10 hidden w-1/3 min-w-fit md:inline">
      <input
        type="text"
        aria-label="Search Field"
        placeholder={placeholder}
        className={"w-full rounded-md border"}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        ref={inputRef}
        style={{ transition: "all 1s ease" }}
      />
      {searchTerm && (
        <div className="shadow-l absolute top-12 left-0 w-full animate-searchSlide rounded-md bg-blue">
          {searchLoading ? (
            <div className="animate-searchSlide">I&apos;m a-looking!</div>
          ) : (
            <ul>
              {searchResults &&
                searchResults.slice(0, 10).map((product: Product) => (
                  <li
                    key={product.id}
                    className="flex cursor-pointer justify-between p-2 hover:text-Green"
                    onClick={() => {
                      setSearchTerm("")
                      router.push(`/product/${product.slug}`)
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={50}
                      height={50}
                    />
                    <span className="my-auto px-5 text-sm text-Green hover:text-orange">
                      {product.name}
                    </span>
                    <BiSearchAlt />
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
