import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { RiCloseCircleFill, RiSearchEyeFill } from "react-icons/ri"
import Spinner from "../Spinner"

const HamburgerSearch = dynamic(() => import("./HamburgerSearch"), {
  loading: () => (
    <div className="flex justify-center items-center">
      <Spinner />
    </div>
  ),
  ssr: false,
})

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchBarOpen, setSearchBarOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const router = useRouter()

  const handleSearchBar = () => {
    setSearchBarOpen(!searchBarOpen)
  }

  const checkForEscape = (e) => {
    if (e.key === "Escape") {
      handleSearchBar()
    }
  }

  useEffect(() => {
    if (searchBarOpen) {
      document.addEventListener("keydown", checkForEscape)
    } else {
      document.removeEventListener("keydown", checkForEscape)
    }
  }, [searchBarOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const linkHelper = (link) => {
    router.push(link)
    setIsOpen(false)
  }

  return (
    <>
      <div className="md:hidden pl-2 z-30">
        <div className="flex justify-between items-center">
          <button onClick={() => toggle()} aria-label="Toggle Menu">
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
              ? "absolute flex flex-col left-60 justify-center items-center w-fit p-5 bg-blue max-h-screen text-xl rounded-2xl hover:border-4 hover:rounded-4xl border-orange duration-300 ease-in animate-fasterDropDown"
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
            onClick={() => linkHelper("/about")}
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
            onClick={() => router.push("#contact")}
          >
            Contact
          </button>
          <div className="text-3xl duration-700 mx-auto">
            <button
              onClick={handleSearchBar}
              className="text-Green hover:text-orange hover:scale-125 duration-300 ease-in pr-2"
              aria-label="Open the search bar"
            >
              <RiSearchEyeFill />
            </button>
            {searchBarOpen && <HamburgerSearch />}
            <button
              className="text-Red hover:scale-125 text-4xl pt-2 h-12 w-12 cursor-pointer duration-300 ease-in"
              onClick={() => toggle()}
              aria-label="Close the menu"
            >
              <RiCloseCircleFill />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex justify-between w-1/5">
        <button
          className="text-Green hover:text-orange cursor-pointer duration-300 ease-in border-x-2 px-2 border-orange rounded-md hover:border-x-4 hover:px-3 hover:rounded-2xl hover:text-sm"
          onClick={() => router.push("/about")}
        >
          About
        </button>
        <button
          className="text-Green hover:text-orange cursor-pointer duration-300 ease-in border-x-2 px-2 border-orange rounded-md hover:border-x-4 hover:px-3 hover:rounded-2xl hover:text-sm"
          onClick={() => router.push("/products")}
        >
          Products
        </button>
        <button
          className="hidden lg:flex text-Green hover:text-orange cursor-pointer duration-300 ease-in border-x-2 px-2 border-orange rounded-md hover:border-x-4 hover:px-3 hover:rounded-2xl hover:text-sm"
          onClick={() => router.push("#contact")}
        >
          Contact
        </button>
      </div>
    </>
  )
}
