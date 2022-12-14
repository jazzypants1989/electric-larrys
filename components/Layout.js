import dynamic from "next/dynamic"
import { Suspense, lazy, useContext } from "react"
import "react-toastify/dist/ReactToastify.css"
import Spinner from "./Layout/Spinner"
import HeadComponent from "./Layout/HeadComponent"
const DynamicCart = dynamic(() => import("./Layout/Cart"), {
  suspense: true,
})

import Header from "./Layout/Header/Header"
const DynamicFooter = dynamic(() => import("./Layout/Footer/Footer"), {
  suspense: true,
})
import { Store } from "../utils/Store"

const ToastContainer = lazy(async () => {
  const { ToastContainer } = await import("react-toastify")
  return { default: ToastContainer }
})

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

      <Suspense fallback={<Spinner />}>
        <ToastContainer
          autoClose={2500}
          toastClassName={() =>
            "bg-blue bg-opacity-80 text-Green drop-shadow shadow-2xl rounded-full p-2 text-center"
          }
          position="top-center"
          limit={3}
          theme="colored"
        />
      </Suspense>

      <header className="w-full">
        <Header />
      </header>

      <div
        onClick={cartOpen ? closeCartHandler : null}
        className="flex bg-blue min-w-fit min-h-screen flex-col justify-between"
      >
        <Suspense fallback={<Spinner />}>
          {cartOpen && <DynamicCart />}
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <main className="m-auto w-full mt-4 px-2">{children}</main>
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <DynamicFooter />
        </Suspense>
      </div>
    </>
  )
}
