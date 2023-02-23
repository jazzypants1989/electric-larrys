import { useState, useRef, useMemo, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { BiSearchAlt } from "react-icons/bi"
import Image from "next/image"
import { IProduct } from "../../../models/Product"

export default function Search({
  placeholder,
  query,
}: {
  placeholder: string
  query?: string
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<IProduct[] | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef(null)

  const doSearch = useMemo(() => {
    return async () => {
      try {
        setSearchLoading(true)
        const { data } = await axios.get(`/api/search?query=${searchTerm}`)
        setSearchResults(data)
        setSearchLoading(false)
      } catch (err) {
        setSearchLoading(false)
      }
    }
  }, [searchTerm])

  useEffect(() => {
    if (searchTerm) {
      doSearch()
    } else {
      setSearchResults([])
    }
  }, [searchTerm, doSearch])

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
                searchResults.slice(0, 10).map((product) => (
                  <li
                    key={product._id}
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
                    <BiSearchAlt className="max-w-8 my-auto inline h-10 max-h-8 w-10 text-Green hover:text-orange" />
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
