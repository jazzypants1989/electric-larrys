import { useRouter } from "next/router"
import { useState, useRef, useEffect, useMemo } from "react"
import axios from "axios"
import Image from "next/image"

export default function HamburgerSearch({ searchBarOpen }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const router = useRouter()
  const searchRef = useRef(null)

  useEffect(() => {
    if (searchBarOpen) {
      searchRef.current.focus()
    }
  }, [searchBarOpen])

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

  const searchHelper = (e) => {
    e.preventDefault()
    doSearch()
  }

  return (
    <div className="absolute right-4 top-63 border-2 flex flex-col justify-center items-center w-fit p-5 bg-blue max-h-screen text-xl rounded-2xl hover:border-4 hover:rounded-4xl border-orange duration-300 ease-in animate-fasterDropDown">
      <form onSubmit={searchHelper}>
        <input
          ref={searchRef}
          type="text"
          placeholder="Explore our oddities"
          className="bg-transparent border-2 border-orange rounded-2xl p-2 text-xl focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {searchLoading && <div className="text-xl text-Green">Loading...</div>}
      {searchResults.length > 0 && (
        <div className="absolute w-fit p-3 bottom-44 bg-blue rounded-2xl border-2 border-orange">
          {searchResults.map((result) => (
            <div
              key={result._id}
              className="flex justify-start items-center"
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
                className="rounded-2xl cursor-pointer"
              />
              <a className="text-Green text-lg hover:text-orange cursor-pointer duration-300 ease-in ml-4">
                {result.name}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
