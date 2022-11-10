import { useState, useRef, useMemo, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { BiSearchAlt } from "react-icons/bi"
import Image from "next/image"

export default function Search(props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
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

  const checkForClick = (e) => {
    if (e.target !== inputRef.current) {
      setSearchResults([])
    }
  }

  useEffect(() => {
    document.addEventListener("click", checkForClick)
    return () => {
      document.removeEventListener("click", checkForClick)
    }
  }, [])

  useEffect(() => {
    if (props.query) {
      setSearchTerm(props.query)
    }
  }, [props.query])
  return (
    <div className="relative w-1/3 z-10 md:inline sm:hidden">
      <input
        type="text"
        name="search"
        id="search"
        placeholder={props.placeholder}
        className={"w-full rounded-md border"}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        ref={inputRef}
        style={{ transition: "all 1s ease" }}
      />
      {searchTerm && (
        <div className="absolute top-12 left-0 animate-searchSlide w-full bg-blue rounded-md shadow-l">
          {searchLoading ? (
            <div className="animate-searchSlide">I&apos;m a-looking!</div>
          ) : (
            <ul>
              {searchResults.slice(0, 10).map((product) => (
                <li
                  key={product._id}
                  className="p-2 flex justify-between cursor-pointer hover:text-Green"
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
                  <span className="text-Green my-auto text-sm hover:text-orange px-5">
                    {product.name}
                  </span>
                  <BiSearchAlt className="inline max-w-8 max-h-8 h-10 w-10 my-auto text-Green hover:text-orange" />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
