"use client"
import Image from "next/image"
import Link from "next/link"
import { Product } from "../../utils/dataHooks/getProducts"
import Store, { CartItem, reactions } from "../../utils/Store"
import { useAtom } from "jotai"
import Card from "../Layout/Card"
import useToast from "../../utils/useToast"
import Button from "../Layout/Button"

export default function ProductItem({ product }: { product: Product }) {
  const [cart, setCart] = useAtom(Store)
  const addToast = useToast()

  const addToCartHandler = (product: Product) => {
    const reaction = reactions[Math.floor(Math.random() * reactions.length)]

    const cartItem = cart.cartItems.find(
      (item) => item.product.id === product.id
    )

    const countInStock = product.countInStock

    if (cartItem && cartItem.quantity >= countInStock) {
      addToast(
        `Sorry, we only have ${countInStock} of ${product.name} in stock.`,
        false
      )
      return
    }

    if (cartItem) {
      setCart({
        ...cart,
        cartItems: cart.cartItems.map((item: CartItem) =>
          item.product.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : item
        ),
      })
    } else {
      setCart({
        ...cart,
        cartItems: [...cart.cartItems, { product, quantity: 1 }],
        cartOpen: true,
      })
    }

    addToast(`${product.name} added to cart, ${reaction}`, true)
  }

  return (
    <Card className="m-2 p-2 drop-shadow transition-all duration-500 ease-in-out hover:translate-y-1 hover:shadow-2xl hover:shadow-orange">
      <Link href={`/products/${product.slug}`} passHref>
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="aspect-auto rounded-4xl"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5 transition-all duration-300 ease-in-out hover:scale-110">
        <Link href={`/products/${product.slug}`} passHref>
          <h2 className="text-xl text-orange">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.category}</p>
        <p>${product.price}</p>
        <Button
          className="add-to-cart drop-shadow"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </Button>
      </div>
    </Card>
  )
}
