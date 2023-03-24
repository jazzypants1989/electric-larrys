"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import RiSearchEyeFill from "./Icons/RiSearchEyeFill"
import RiCloseCircleFill from "./Icons/RiCloseCircleFill"
import HamburgerSearch from "./HamburgerSearch"

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchBarOpen, setSearchBarOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const router = useRouter()

  const handleSearchBar = () => {
    setSearchBarOpen(!searchBarOpen)
  }

  const checkForEscape = (e: KeyboardEvent) => {
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

  const linkHelper = (link: string) => {
    router.push(link)
    setIsOpen(false)
  }

  const contactLink = () => {
    setIsOpen(false)
    scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    })
  }

  return (
    <>
      <div className="z-30 pl-2 md:hidden">
        <div className="flex items-center justify-between">
          <button onClick={() => toggle()} aria-label="Toggle Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="flex h-10 w-10 cursor-pointer items-center justify-center text-Green duration-300 ease-in hover:rotate-180 hover:text-orange"
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
              ? "absolute flex max-h-screen w-fit animate-fasterDropDown flex-col items-center justify-center rounded-2xl border-orange bg-blue p-5 text-xl duration-300 ease-in hover:rounded-4xl hover:border-4"
              : "hidden"
          }`}
        >
          <button
            className="cursor-pointer text-Green duration-300 ease-in hover:text-orange"
            onClick={() => linkHelper("/")}
          >
            Home
          </button>
          <button
            className="cursor-pointer text-Green duration-300 ease-in hover:text-orange"
            onClick={() => linkHelper("/about")}
          >
            About
          </button>
          <button
            className="cursor-pointer text-Green duration-300 ease-in hover:text-orange"
            onClick={() => linkHelper("/products")}
          >
            Products
          </button>
          <button
            className="cursor-pointer text-Green duration-300 ease-in hover:text-orange"
            onClick={() => contactLink()}
          >
            Contact
          </button>
          <div className="mx-auto text-3xl duration-700">
            <button
              onClick={handleSearchBar}
              className="pr-2 text-Green duration-300 ease-in hover:scale-125 hover:text-orange"
              aria-label="Open the search bar"
            >
              <RiSearchEyeFill />
            </button>
            {searchBarOpen && <HamburgerSearch searchBarOpen={searchBarOpen} />}
            <button
              className="h-12 w-12 cursor-pointer pt-2 text-4xl text-Red duration-300 ease-in hover:scale-125"
              onClick={() => toggle()}
              aria-label="Close the menu"
            >
              <RiCloseCircleFill />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden w-1/5 justify-between text-base md:flex">
        <button
          className="cursor-pointer rounded-md border-x-2 border-orange px-2 text-Green duration-300 ease-in hover:rounded-2xl hover:border-x-4 hover:px-3 hover:text-sm hover:text-orange"
          onClick={() => router.push("/about")}
        >
          About
        </button>
        <button
          className="cursor-pointer rounded-md border-x-2 border-orange px-2 text-Green duration-300 ease-in hover:rounded-2xl hover:border-x-4 hover:px-3 hover:text-sm hover:text-orange"
          onClick={() => router.push("/products")}
        >
          Products
        </button>
        <button
          className="hidden cursor-pointer rounded-md border-x-2 border-orange px-2 text-Green duration-300 ease-in hover:rounded-2xl hover:border-x-4 hover:px-3 hover:text-sm hover:text-orange lg:flex"
          onClick={() => contactLink()}
        >
          Contact
        </button>
      </div>
    </>
  )
}
