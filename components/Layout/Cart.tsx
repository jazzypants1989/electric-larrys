import Store from "../../utils/Store"
import Image from "next/image"
import Link from "next/link"
import { BsXCircleFill } from "react-icons/bs"
import axios from "axios"
import { toast } from "react-toastify"
import getStripe from "../../utils/getStripe"
import Card from "./Card"

const Cart = () => {
    const removeFromCart = Store.use.removeItem()
    const updateCart = Store.use.updateCart()
    const toggleCart = Store.use.toggleCart()
    const cart = Store.use.cart()

    const removeItemHandler = (item) => {
        removeFromCart(item)
    }

    const updateCartHandler = async (item, qty) => {
        const quantity = Number(qty)
        const { data } = await axios.get(`/api/products/${item._id}`)
        if (data.countInStock < quantity) {
            return toast.error("You snooze, you lose. We don't have that many left!")
        }
        updateCart(item, quantity)
        toast.success("Changed your mind, eh? No problemo!")
    }
    
    const closeCartHandler = () => {
        toggleCart()
    }

    const findTotal = () => {
        let roughTotal = cart.cartItems.reduce((acc, item) => {
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
            body: JSON.stringify({
                cartItems: cart.cartItems,
            }),
        })
        const session = await response.json()
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        })
        if (result.error) {
            toast.error(result.error.message)
        }
    }
    
    return (
        <div
            className={`min-h-72 fixed bottom-0 z-50 w-88 animate-flyUp scroll-auto rounded-tr-4xl bg-blue shadow-inner shadow-orange md:min-h-screen md:animate-woosh md:rounded-r-cart md:rounded-tr-cart md:shadow-3xl-left md:shadow-orange`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex flex-col items-center justify-between md:pr-16">
                <h3 className="m-4 drop-shadow md:text-lg">Cart full of goodies.</h3>
                {cart.cartItems.length === 0 && (
                    <div className="flex h-fit w-full flex-col items-center justify-center gap-5 md:min-h-screen">
                        Aw, shucks. There&apos;s nothing here...{" "}
                        <Link href="/products" passHref>
                            <span
                                onClick={() => toggleCart()}
                                className="mb-4 cursor-pointer text-lg text-orange underline drop-shadow hover:text-Green"
                            >
                                Go get some cool stuff!
                            </span>
                        </Link>
                        <button
                            onClick={closeCartHandler}
                            className="-translate-y-4 rounded-full bg-orange text-blue drop-shadow duration-300 hover:scale-125 hover:text-Red"
                        >
                            <BsXCircleFill className="text-2xl" />
                        </button>
                    </div>
                )}
                {cart.cartItems.length > 0 && (
                    <div className="grid grid-cols-2 md:gap-5">
                        <div className="min-w-full md:col-span-3">
                            <table className="w-84 min-w-full">
                                <tbody>
                                    {cart.cartItems.map((item) => (
                                        <tr key={item.slug} className="border-b pr-2">
                                            <td className="p-1">
                                                <Link
                                                    href={`/product/${item.slug}`}
                                                    passHref
                                                    className="flex items-center justify-center "
                                                    onClick={() => toggleCart()}
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={100}
                                                        height={100}
                                                    ></Image>
                                                    &nbsp;
                                                </Link>
                                            </td>
                                            <td className="m-1">
                                                <Link
                                                    href={`/product/${item.slug}`}
                                                    className="md:text-sm"
                                                    onClick={() => toggleCart()}
                                                >
                                                    {item.name}
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
                                                ${item.price * item.quantity}
                                            </td>
                                            <td className="px-3 text-right">
                                                <button
                                                    onClick={() => removeItemHandler(item)}
                                                    className="text-2xl text-red"
                                                >
                                                    <BsXCircleFill />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Card className="relative right-24 bottom-44 h-fit w-max border-2 border-orange bg-blue p-5 md:right-0 md:left-14 md:bottom-0">
                            <ul>
                                <li>
                                    <div className="pb-3 md:text-lg">
                                        Subtotal ({cart.cartItems.reduce((a, c) => a + c.quantity, 0)}) :
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
                        </Card>
                        <button
                            onClick={closeCartHandler}
                            className="absolute right-0 top-0 h-7 w-7"
                        >
                            <BsXCircleFill className="text-2xl" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart