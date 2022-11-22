import { useContext } from "react"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

import HeadComponent from "./Layout/HeadComponent"
import Cart from "./Layout/Cart"
import Header from "./Layout/Header/Header"
import Footer from "./Layout/Footer/Footer"
import { Store } from "../utils/Store"

export default function Layout({
  title,
  description,
  image,
  slug,
  tags,
  children,
}) {
  const { state, dispatch } = useContext(Store)
  const { cartOpen } = state

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
        limit={3}
        theme="colored"
      />
      <Header />

      <div
        onClick={cartOpen ? closeCartHandler : null}
        className="flex bg-blue min-w-fit min-h-screen flex-col justify-between"
      >
        {cartOpen && <Cart />}
        <main className="m-auto mt-4 px-2">{children}</main>
        <Footer />
      </div>
    </>
  )
}
