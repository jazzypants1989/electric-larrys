"use client"

import { useRouter } from "next/navigation"
import { useState, useRef, useEffect, MutableRefObject, FormEvent } from "react"
import Image from "next/image"
import { Product, Products } from "../../../utils/dataHooks/getProducts"
import useDebounce from "../../../utils/useDebounce"

export default function HamburgerSearch({
  searchBarOpen,
}: {
  searchBarOpen: boolean
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Products | null>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const router = useRouter()
  const searchRef = useRef() as MutableRefObject<HTMLInputElement>
  const resultsRef = useRef() as MutableRefObject<HTMLDivElement>
  console.log("resultsRef", resultsRef)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const searchHelper = (e: FormEvent) => {
    e.preventDefault()
    setSearchTerm(searchRef.current.value)
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      if (debouncedSearchTerm.length < 3) return
      setSearchLoading(true)
      fetch(`/api/search?search=${debouncedSearchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data)
          setSearchLoading(false)
        })
    } else {
      setSearchResults([])
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setSearchResults([])
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchRef, resultsRef])

  function handleSearchResultClick(result: Product) {
    setSearchResults([])
    setSearchTerm("")
    router.push(`/products/${result.slug}`)
  }

  useEffect(() => {
    if (searchBarOpen) {
      searchRef.current.focus()
    }
  }, [searchBarOpen])

  return (
    <div className="top-63 absolute -inset-x-36 flex max-h-screen w-fit animate-fasterDropDown flex-col items-center justify-center rounded-2xl border-2 border-orange bg-blue p-2 text-xl transition-all duration-1000 ease-in-out hover:rounded-4xl hover:border-4 hover:border-orange hover:bg-blue">
      <form onSubmit={searchHelper}>
        <input
          ref={searchRef}
          type="text"
          placeholder="Explore our oddities"
          className="bg-transparent focus:border-transparent max-w-xs rounded-2xl border-2 border-orange p-2 text-xl focus:outline-none focus:ring-2 focus:ring-orange"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {searchLoading && <div className="text-xl text-Green">Loading...</div>}
      {searchResults &&
        searchResults.length === 0 &&
        debouncedSearchTerm.length >= 3 &&
        !searchLoading && (
          <div className="text-xl text-orange">No results found</div>
        )}

      {searchResults &&
        searchResults.length === 0 &&
        debouncedSearchTerm.length < 3 &&
        debouncedSearchTerm.length > 0 &&
        !searchLoading && (
          <div className="text-xl text-orange">
            Search term must be at least 3 characters
          </div>
        )}
      {searchResults && searchResults.length > 0 && (
        <div className="relative right-10 w-full rounded-2xl border-2 border-orange bg-blue p-2">
          {searchResults.map((result: Product) => (
            <div
              key={result.id}
              className="flex cursor-pointer items-center justify-between rounded-2xl border-b-2 border-orange p-2 transition-all duration-1000 ease-in-out hover:rounded-4xl hover:bg-orange hover:p-2 hover:text-blue"
              onClick={() => {
                handleSearchResultClick(result)
              }}
            >
              <Image
                src={result.image}
                alt={result.name}
                width={50}
                height={50}
                className="cursor-pointer rounded-2xl"
              />
              <div>{result.name}</div>
              <span className="text-xl text-orange drop-shadow">
                {result.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
