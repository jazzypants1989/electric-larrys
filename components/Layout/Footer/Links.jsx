import Link from "next/link"

export default function Links() {
  return (
    <div className="text-center h-full">
      <h5 className="text-lg p-2">Around the website</h5>
      <nav
        aria-label="Footer Navigation Bar"
        className="underline hover:underline-offset-4 text-center transition-all duration-500 hover:scale-105"
      >
        <ul className="grid grid-cols-2 mx-10 md:mx-auto gap-1 mb-2 text-center text-base md:text-xs">
          <li className="p-1 font-thin hover:text-orange hover:scale-125">
            <Link href="/">Home</Link>
          </li>
          <li className="p-1 font-thin hover:text-orange hover:scale-125">
            <Link href="/cart">Cart</Link>
          </li>
          <li className="p-1 font-thin hover:text-orange hover:scale-125">
            <Link href="/products">All products</Link>
          </li>
          <li className="p-1 font-thin hover:text-orange hover:scale-125">
            <Link href="/products?category=movies">Movies / TV</Link>
          </li>
          <li className="p-1 font-thin hover:text-orange hover:scale-125">
            <Link href="/products?category=music">Music</Link>
          </li>
          <li className="p-1 font-thin hover:text-orange hover:scale-125">
            <Link href="/products?category=board%20games">Board Games</Link>
          </li>
          <li className="p-1 font-thin hover:text-orange hover:scale-125">
            <Link href="/products?category=books">Books</Link>
          </li>
          <li className="p-1 font-thin hover:text-orange hover:scale-125">
            <Link href="/products?category=oddities">Oddities</Link>
          </li>
          <li className="p-1 font-thin hover:text-orange hover:scale-125">
            <Link href="/profile">My Account</Link>
          </li>
          <li className="p-1 font-thin hover:text-orange hover:scale-125">
            <Link href="/terms">Terms</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
