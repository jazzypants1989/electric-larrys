"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Product, Products } from "../../../utils/dataHooks/getProducts"
import BiSearchAlt from "./Icons/BiSearchAlt"
import useDebounce from "../../../utils/useDebounce"
import Button from "../Button"

export default function Search({
  placeholder,
  query,
}: {
  placeholder: string
  query?: string
}) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Products>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const search = useCallback(async () => {
    console.log("The search function is running")
    setSearchLoading(true)
    const res = await fetch(`/api/search?search=${debouncedSearchTerm}`)

    if (res.ok) {
      const data = await res.json()
      setSearchResults(data)
      setSearchLoading(false)
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (
      debouncedSearchTerm &&
      debouncedSearchTerm.length > 2 &&
      debouncedSearchTerm === searchTerm
    ) {
      search()
    } else {
      setSearchResults([])
    }
  }, [debouncedSearchTerm, search, searchTerm])

  useEffect(() => {
    if (query) {
      setSearchTerm(query)
    }
  }, [query])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  //check for clicks outside of the search input
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setSearchResults([])
        setSearchTerm("")
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative z-10 hidden w-1/3 min-w-fit md:inline">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="w-full rounded-md"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
      />
      {searchTerm && (
        <div className="shadow-l absolute top-12 left-0 w-full animate-searchSlide rounded-md bg-blue">
          {searchLoading ? (
            <div className="animate-searchSlide">I&apos;m a-looking!</div>
          ) : (
            <ul>
              {searchResults && searchResults.length > 0 && (
                <>
                  {searchResults.slice(0, 10).map((product: Product) => (
                    <li
                      key={product.id}
                      className="flex cursor-pointer justify-between p-2 hover:text-Green"
                      onClick={() => {
                        router.push(`/products/${product.slug}`)
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
                      <span className="my-auto px-5 text-sm text-Green hover:text-orange">
                        {product.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                      <BiSearchAlt />
                    </li>
                  ))}
                  <Button
                    onClick={() => {
                      router.push(`/products?search=${searchTerm}`)
                      setSearchResults([])
                      setSearchTerm("")
                      router.refresh()
                    }}
                    className="w-full"
                  >
                    See all results
                  </Button>
                </>
              )}
              {searchResults.length === 0 && searchTerm.length > 2 && (
                <li className="flex cursor-pointer justify-between p-2 hover:text-Green">
                  <span className="my-auto px-5 text-sm text-Green hover:text-orange">
                    No results found
                  </span>
                  <Button
                    onClick={() => {
                      router.push(`/products?search=${searchTerm}`)
                      setSearchResults([])
                      setSearchTerm("")
                      router.refresh()
                    }}
                  >
                    Try a fuzzy search
                  </Button>
                </li>
              )}
              {searchTerm.length < 3 && (
                <li className="flex cursor-pointer justify-between p-2 hover:text-Green">
                  <span className="my-auto px-5 text-sm text-Green hover:text-orange">
                    Gimme more letters!
                  </span>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
