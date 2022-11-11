import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Cookies from "js-cookie"
import React, { useContext, useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { Menu } from "@headlessui/react"
import "react-toastify/dist/ReactToastify.css"
import { BsCart4 } from "react-icons/bs"
import DropdownLink from "./DropdownLink"
import Footer from "./Footer"
import HeadComponent from "./HeadComponent"
import { Store } from "../utils/Store"
import Search from "./SearchWithUseRef"
import HamburgerMenu from "./HamburgerMenu"
import Cart from "./Cart"

export default function Layout({
  title,
  description,
  image,
  slug,
  tags,
  children,
}) {
  const { status, data: session } = useSession()
  const { state, dispatch } = useContext(Store)
  const { cart, cartOpen } = state
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
  const closeCartHandler = () => {
    dispatch({ type: "CART_CLOSE" })
  }

  return (
    <>
      <HeadComponent
        title={title}
        description={description}
        tags={tags}
        image={image}
        slug={slug}
      />
      <ToastContainer
        autoClose={2500}
        toastClassName={() =>
          "bg-blue bg-opacity-80 text-Green drop-shadow shadow-2xl rounded-full p-2 text-center"
        }
        position="top-center"
        limit={2}
        theme="colored"
      />

      <div
        onClick={cartOpen ? closeCartHandler : null}
        className="pt-2 flex bg-blue min-w-fit min-h-screen flex-col justify-between"
      >
        <header>
          <nav className="flex flex-wrap h-16 items-center justify-between shadow-md mx-5">
            <Link href="/">
              <a className="drop-shadow text-4xl font-thin lg:text-3xl sm:text-lg hover:text-Green duration-500">
                Electric Larry&apos;s
              </a>
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
                  className="absolute -translate-y-3 lg:-translate-y-2 -translate-x-5 lg:ml-2 rounded-full bg-Green font-extralight hover:bg-orange px-1 text-Black hover:text-Green transition-all duration-500 ease-in-out cursor-pointer"
                >
                  {cartItemsCount}
                </span>
              )}

              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="z-40 relative inline-block">
                  <Menu.Button className="tracking-wide font-thin hover:text-orange lg:text-lg">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right mt-4 shadow-lg bg-blue z-10">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
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
                <Link href="/login">
                  <a className="p-2 hover:text-Green">Log-in!</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        {cartOpen && <Cart />}
        <main className="m-auto mt-4 px-2">{children}</main>
        <Footer />
      </div>
    </>
  )
}
