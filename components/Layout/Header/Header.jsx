import { useContext, useState, useEffect } from "react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Cookies from "js-cookie"
import { Menu } from "@headlessui/react"
import { BsCart4 } from "react-icons/bs"

import { Store } from "../../../utils/Store"
import DropdownLink from "./DropdownLink"
import Search from "./SearchWithUseRef"
import HamburgerMenu from "./HamburgerMenu"

export default function Header() {
  const { status, data: session } = useSession()
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const [cartItemsCount, setCartItemsCount] = useState(0)

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])

  const logoutClickHandler = () => {
    Cookies.remove("cart")
    dispatch({ type: "CART_RESET" })
    signOut({ callbackUrl: "/login" })
  }

  const cartClickHandler = () => {
    dispatch({ type: "CART_OPEN" })
  }
  return (
    <nav
      className="flex min-w-88 h-16 items-center justify-between shadow-md ml-2"
      aria-label="Top Navigation Bar"
    >
      <Link
        href="/"
        className="drop-shadow text-base font-thin md:text-xl lg:text-3xl text-orange hover:text-Green duration-500"
      >
        Electric Larry&apos;s
      </Link>
      <Search placeholder="Explore our oddities!" />
      <HamburgerMenu />
      <div>
        <BsCart4
          onClick={cartClickHandler}
          className="inline h-7 w-7 mx-5 lg:mr-0 lg:-translate-x-2 lg:-translate-y-2 lg:h-10 lg:w-10 text-orange hover:text-Green hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer"
        />
        {cartItemsCount > 0 && (
          <span
            onClick={cartClickHandler}
            className="absolute -translate-y-3 lg:-translate-y-3 -translate-x-6 lg:ml-2 rounded-full bg-Green font-extralight hover:bg-orange px-1 text-Black hover:text-Green transition-all duration-500 ease-in-out cursor-pointer"
          >
            {cartItemsCount}
          </span>
        )}

        {status === "loading" ? (
          "Loading"
        ) : session?.user ? (
          <Menu as="div" className="z-40 relative inline-block">
            <Menu.Button className="tracking-wide mr-2 selection:font-thin hover:text-orange lg:text-lg">
              {session.user.name}
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-56 origin-top-right mt-4 shadow-lg bg-blue z-10">
              <Menu.Item>
                <DropdownLink className="dropdown-link" href="/profile">
                  Profile / Order History
                </DropdownLink>
              </Menu.Item>
              {session.user.isAdmin && (
                <Menu.Item>
                  <DropdownLink
                    className="dropdown-link"
                    href="/admin/dashboard"
                  >
                    Admin Dashboard
                  </DropdownLink>
                </Menu.Item>
              )}
              <Menu.Item>
                <a
                  className="dropdown-link"
                  href="#"
                  onClick={logoutClickHandler}
                >
                  Logout
                </a>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <Link href="/login" className="mr-8 hover:text-Green">
            Login!
          </Link>
        )}
      </div>
    </nav>
  )
}
