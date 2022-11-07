import Link from "next/link"
import { RiShoppingBag3Fill } from "react-icons/ri"
import { CutiePie, NavItems, NavStyles, OuterNav } from "../styles/NavStyles"
import { useCart } from "../lib/context"
import Cart from "./Cart"
import User from "./User"
import { useUser } from "@auth0/nextjs-auth0"

const { AnimatePresence } = require("framer-motion")

export default function Nav() {
  const { cartItems, cartOpen, setCartOpen } = useCart()
  const { user, error, isLoading } = useUser()
  console.log(user)

  return (
    <OuterNav>
      <Link href="/">Electric Larry&apos;s!</Link>
      <NavStyles>
        <NavItems>
          <li>
            <RiShoppingBag3Fill onClick={() => setCartOpen(true)} />
            <AnimatePresence>{cartOpen && <Cart />}</AnimatePresence>
          </li>
          {cartItems.length >= 1 && (
            <CutiePie
              onClick={() => setCartOpen(true)}
              animate={{ scale: 1.1 }}
              initial={{ scale: 0 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 160,
                damping: 10,
              }}
            >
              {cartItems
                .reduce((acc, item) => acc + item.quantity, 0)
                .toString()}
            </CutiePie>
          )}
          <User />
        </NavItems>
      </NavStyles>
    </OuterNav>
  )
}
