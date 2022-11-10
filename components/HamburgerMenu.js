import SearchWithUseRef from "./SearchWithUseRef"
import { useRouter } from "next/router"
import { useState, useRef, useEffect } from "react"

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const router = useRouter()
  const linkHelper = (link) => {
    router.push(link)
    setIsOpen(false)
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
              ? "absolute flex flex-col justify-center items-center w-fit p-5 bg-blue max-h-screen text-xl rounded-2xl hover:border-4 hover:rounded-4xl border-orange duration-300 ease-in animate-dropDown"
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
          <button
            className="text-Green hover:text-orange cursor-pointer duration-300 ease-in"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            className="text-Green hover:text-orange cursor-pointer duration-300 ease-in"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
          <SearchWithUseRef />
          <button
            className="text-Green hover:text-orange cursor-pointer duration-300 ease-in"
            onClick={() => toggle()}
          >
            Close
          </button>
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
