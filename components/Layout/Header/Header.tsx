"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { signOut } from "next-auth/react"
import { Menu } from "@headlessui/react"
import { useAtom } from "jotai"

import Store from "../../../utils/Store"
import DropdownLink from "./DropdownLink"
import BsCart4 from "./Icons/BsCart4"
import Search from "./SearchWithUseRef"
import HamburgerMenu from "./HamburgerMenu"
import Loading from "../../Layout/Spinner"

import type { User } from "@/types"

// import Cart from "../Cart"
const DynamicCart = dynamic(() => import("../Cart"), {
  loading: () => <Loading />,
  suspense: true,
})

function Header({ user }: { user: User }) {
  const [cart, setCart] = useAtom(Store)

  const cartClickHandler = () => {
    setCart((prev) => ({ ...prev, cartOpen: !prev.cartOpen }))
  }

  const cartItems = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)

  function resetCart() {
    cart.cartItems = []
    setCart({ ...cart })
  }

  const logoutClickHandler = () => {
    resetCart()
    signOut({ callbackUrl: "/login" })
  }

  return (
    <>
      {cart.cartOpen && <DynamicCart />}
      <header
        className="relative z-50 ml-2 flex h-16 items-center justify-between shadow-md"
        aria-label="Top Navigation Bar"
        id="header"
      >
        <Link
          href="/"
          className="text-base font-thin text-orange drop-shadow duration-500 hover:text-Green md:text-xl lg:text-3xl"
        >
          Electric Larry&apos;s
        </Link>
        <Search placeholder="Explore our oddities!" />
        <HamburgerMenu />
        <div className="sticky top-0">
          <BsCart4 cartClickHandler={cartClickHandler} />

          {cartItems > 0 && (
            <span
              onClick={cartClickHandler}
              className="cart-buttons absolute -translate-y-3 -translate-x-6 cursor-pointer rounded-full bg-Green px-1 font-extralight text-Black transition-all duration-500 ease-in-out hover:bg-orange hover:text-Green lg:ml-2 lg:-translate-y-1"
            >
              {cartItems}
            </span>
          )}

          {user ? (
            <Menu as="nav" className="relative inline-block text-left">
              <Menu.Button className="mr-2 tracking-wide selection:font-thin hover:text-orange lg:text-lg">
                {user.name}
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-50 w-56 origin-top-right rounded-lg bg-blue shadow-lg ring-1 ring-Black ring-opacity-5 transition-all duration-300 ease-in-out focus:outline-none">
                <Menu.Item>
                  <DropdownLink href="/profile">Profile / Orders</DropdownLink>
                </Menu.Item>

                {user.isEmployee || user.isAdmin ? (
                  <Menu.Item>
                    <DropdownLink href="/admin/">Admin Dashboard</DropdownLink>
                  </Menu.Item>
                ) : null}

                <Menu.Item>
                  <a
                    className="flex rounded-md p-2 tracking-widest text-Green transition-all duration-300 ease-in-out hover:bg-Green hover:text-blue hover:shadow-none"
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
      </header>
    </>
  )
}

export default Header
