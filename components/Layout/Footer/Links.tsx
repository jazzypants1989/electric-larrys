"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"

export default function Links() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      const header = document.querySelector("#header") as HTMLElement

      if (ref.current?.contains(target) && target.tagName === "A") {
        scroll({
          top: header.offsetHeight,
          behavior: "smooth",
        })
      }
    }

    document.addEventListener("click", clickScroll)

    return () => {
      document.removeEventListener("click", clickScroll)
    }
  }, [])

  return (
    <div className="h-full text-center" ref={ref}>
      <h5 className="p-2 text-lg">Around the website</h5>
      <nav
        aria-label="Footer Navigation Bar"
        className="text-center underline transition-all duration-500 hover:scale-105 hover:underline-offset-4"
      >
        <ul className="mx-10 mb-2 grid grid-cols-2 gap-1 text-center text-base text-orange md:mx-auto md:text-xs">
          <li className="p-1 font-thin hover:scale-125 hover:text-Yellow">
            <Link href="/">Home</Link>
          </li>
          <li className="p-1 font-thin hover:scale-125 hover:text-Yellow">
            <Link href="/cart">Cart</Link>
          </li>
          <li className="p-1 font-thin hover:scale-125 hover:text-Yellow">
            <Link href="/products">All products</Link>
          </li>
          <li className="p-1 font-thin hover:scale-125 hover:text-Yellow">
            <Link href="/products?category=movies/tv">Movies/TV</Link>
          </li>
          <li className="p-1 font-thin hover:scale-125 hover:text-Yellow">
            <Link href="/products?category=board%20games">Board Games</Link>
          </li>
          <li className="p-1 font-thin hover:scale-125 hover:text-Yellow">
            <Link href="/products?category=toys">Toys</Link>
          </li>
          <li className="p-1 font-thin hover:scale-125 hover:text-Yellow">
            <Link href="/products?category=books">Books</Link>
          </li>
          <li className="p-1 font-thin hover:scale-125 hover:text-Yellow">
            <Link href="/products?category=pop%20culture">Pop Culture</Link>
          </li>
          <li className="p-1 font-thin hover:scale-125 hover:text-Yellow">
            <Link href="/profile">My Account</Link>
          </li>
          <li className="p-1 font-thin hover:scale-125 hover:text-Yellow">
            <Link href="/terms">Terms</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
