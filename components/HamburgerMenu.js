import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { useState, useRef, useEffect } from "react"
import { RiCloseCircleFill, RiSearchEyeFill } from "react-icons/ri"

export default function HamburgerMenu(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchBarOpen, setSearchBarOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const router = useRouter()
  const searchRef = useRef(null)

  const handleSearchBar = () => {
    setSearchBarOpen(!searchBarOpen)
  }

  useEffect(() => {
    if (searchBarOpen) {
      searchRef.current.focus()
    }
  }, [searchBarOpen])

  const checkForEscape = (e) => {
    if (e.key === "Escape") {
      handleSearchBar()
    }
  }

  useEffect(() => {
    if (searchBarOpen) {
      document.addEventListener("click", checkForClick)
      document.addEventListener("keydown", checkForEscape)
    } else {
      document.removeEventListener("click", checkForClick)
      document.removeEventListener("keydown", checkForEscape)
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

  const checkForClick = (e) => {
    if (e.target !== searchRef.current) {
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

  const linkHelper = (link) => {
    router.push(link)
    setIsOpen(false)
  }

  const searchHelper = (e) => {
    e.preventDefault()
    doSearch()
  }

  return (
    <>
      <div className="md:hidden z-30">
        <div className="flex justify-between items-center">
          <button onClick={() => toggle()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="flex items-center justify-center w-10 h-10 text-Green hover:text-orange cursor-pointer duration-300 ease-in hover:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen
              ? "absolute flex flex-col left-60 bottom-0 justify-center items-center w-fit p-5 bg-blue max-h-screen text-xl rounded-2xl hover:border-4 hover:rounded-4xl border-orange duration-300 ease-in animate-fasterDropDown"
              : "hidden"
          }`}
        >
          <button
            className="text-Green hover:text-orange cursor-pointer duration-300 ease-in"
            onClick={() => linkHelper("/")}
          >
            Home
          </button>
          <button
            className="text-Green hover:text-orange cursor-pointer duration-300 ease-in"
            onClick={() => linkHelper("/products")}
          >
            About
          </button>
          <button
            className="text-Green hover:text-orange cursor-pointer duration-300 ease-in"
            onClick={(() => toggle(), () => router.push("/products"))}
          >
            Products
          </button>
          <button
            className="text-Green hover:text-orange cursor-pointer duration-300 ease-in"
            onClick={() => router.push("/cart")}
          >
            Cart
          </button>
          <button
            className="text-Green hover:text-orange cursor-pointer duration-300 ease-in"
            onClick={() => router.push("#contact")}
          >
            Contact
          </button>
          <div className="text-3xl duration-700 mx-auto">
            <button
              onClick={handleSearchBar}
              className="text-Green hover:text-orange hover:scale-125 duration-300 ease-in pr-2"
            >
              <RiSearchEyeFill />
            </button>
            {searchBarOpen && (
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
                {searchLoading && (
                  <div className="text-xl text-Green">Loading...</div>
                )}
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
            )}
            <button
              className="text-Red hover:scale-125 text-4xl pt-2 h-12 w-12 cursor-pointer duration-300 ease-in"
              onClick={() => toggle()}
            >
              <RiCloseCircleFill />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex justify-between w-1/5">
        <button
          className="text-Green hover:text-orange cursor-pointer duration-300 ease-in border-x-2 px-2 border-orange rounded-md hover:border-x-4 hover:px-6 hover:rounded-2xl hover:text-sm"
          onClick={() => router.push("/about")}
        >
          About
        </button>
        <button
          className="text-Green hover:text-orange cursor-pointer duration-300 ease-in border-x-2 px-2 border-orange rounded-md hover:border-x-4 hover:px-6 hover:rounded-2xl hover:text-sm"
          onClick={() => router.push("/products")}
        >
          Products
        </button>
        <button
          className="hidden lg:flex text-Green hover:text-orange cursor-pointer duration-300 ease-in border-x-2 px-2 border-orange rounded-md hover:border-x-4 hover:px-6 hover:rounded-2xl hover:text-sm"
          onClick={() => router.push("#contact")}
        >
          Contact
        </button>
      </div>
    </>
  )
}
