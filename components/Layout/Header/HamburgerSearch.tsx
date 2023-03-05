"use client"

import { useRouter } from "next/navigation"
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  MutableRefObject,
  FormEvent,
} from "react"
import Image from "next/image"
import { Products } from "../../../utils/dataHooks/getProducts"

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

  useEffect(() => {
    if (searchBarOpen) {
      if (searchRef.current) searchRef.current.focus()
    }
  }, [searchBarOpen])

  const doSearch = useMemo(() => {
    return async () => {
      try {
        setSearchLoading(true)
        // const { data } = await axios.get(`/api/search?query=${searchTerm}`)
        const res = await fetch(`/api/search?query=${searchTerm}`)
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

  const searchHelper = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    doSearch()
  }

  return (
    <div className="top-63 absolute right-4 flex max-h-screen w-fit animate-fasterDropDown flex-col items-center justify-center rounded-2xl border-2 border-orange bg-blue p-5 text-xl duration-300 ease-in hover:rounded-4xl hover:border-4">
      <form onSubmit={searchHelper}>
        <input
          ref={searchRef}
          type="text"
          placeholder="Explore our oddities"
          className="bg-transparent focus:border-transparent rounded-2xl border-2 border-orange p-2 text-xl focus:outline-none focus:ring-2 focus:ring-orange"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {searchLoading && <div className="text-xl text-Green">Loading...</div>}
      {searchResults && searchResults.length > 0 && (
        <div className="absolute bottom-44 w-fit rounded-2xl border-2 border-orange bg-blue p-3">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center justify-start"
              onClick={() => {
                setSearchTerm("")
                setSearchResults([])
                router.push(`/product/${result.slug}`)
              }}
            >
              <Image
                src={result.image}
                alt={result.name}
                width={50}
                height={50}
                className="cursor-pointer rounded-2xl"
              />
              <a className="ml-4 cursor-pointer text-lg text-Green duration-300 ease-in hover:text-orange">
                {result.name}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
