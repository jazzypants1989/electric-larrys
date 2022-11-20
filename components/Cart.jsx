import { useContext } from "react"
import { Store } from "../utils/Store"
import Image from "next/image"
import Link from "next/link"
import { BsXCircleFill } from "react-icons/bs"
import axios from "axios"
import { toast } from "react-toastify"
import getStripe from "../utils/getStripe"

export default function Cart() {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item })
  }
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty)
    const { data } = await axios.get(`/api/products/${item._id}`)
    if (data.countInStock < quantity) {
      return toast.error("You snooze, you lose. We don't have that many left!")
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } })
    toast.success("Changed your mind, eh? No problemo!")
  }

  const findTotal = () => {
    let roughTotal = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    return roughTotal.toFixed(2)
  }

  const handleCheckout = async () => {
    const stripe = await getStripe()
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    })
    const data = await response.json()
    stripe.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <div
      className={`z-50 min-h-72 bottom-0 rounded-tr-4xl md:rounded-r-cart md:rounded-tr-cart md:min-h-screen w-88 fixed bg-blue shadow-orange shadow-inner md:shadow-3xl-left md:shadow-orange sm:animate-flyUp md:animate-woosh`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col items-center md:pr-16 justify-between">
        <h1 className="drop-shadow m-4 md:text-lg">Cart full of goodies.</h1>
        {cartItems.length === 0 && (
          <div className="items-center justify-center md:min-h-screen w-full gap-10 flex flex-col">
            Aw, shucks. There&apos;s nothing here...{" "}
            <Link href="/products" passHref>
              <span
                onClick={() => dispatch({ type: "CART_CLOSE" })}
                className="mb-4 underline text-lg text-orange hover:text-Green cursor-pointer drop-shadow"
              >
                Go get some cool stuff!
              </span>
            </Link>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="grid grid-cols-2 md:gap-5">
            <div className="min-w-full md:col-span-3">
              <table className="min-w-full w-84">
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.slug} className="border-b pr-2">
                      <td className="p-1">
                        <Link href={`/product/${item.slug}`}>
                          <a
                            className="flex items-center justify-center "
                            onClick={() => dispatch({ type: "CART_CLOSE" })}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={100}
                              height={100}
                            ></Image>
                            &nbsp;
                          </a>
                        </Link>
                      </td>
                      <td className="m-1">
                        <Link href={`/product/${item.slug}`}>
                          <a
                            className="md:text-sm"
                            onClick={() => dispatch({ type: "CART_CLOSE" })}
                          >
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className="">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 text-right text-base">
                        ${item.price}
                      </td>
                      <td className="px-3 text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          <BsXCircleFill className="delete-button"></BsXCircleFill>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card relative h-fit w-max right-24 bottom-44 md:right-0 md:left-14 md:bottom-0 border-2 border-orange bg-blue p-5">
              <ul>
                <li>
                  <div className="pb-3 md:text-lg">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                    ${findTotal()}
                  </div>
                </li>
                <li>
                  <button
                    onClick={handleCheckout}
                    className="primary-button md:w-full"
                  >
                    Check Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
