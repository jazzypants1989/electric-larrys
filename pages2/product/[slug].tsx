import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import React, { useContext } from "react"
import Card from "../../components/Layout/Card"
import { toast } from "react-toastify"
import Layout from "../../components/Layout"
import Product, { IProduct } from "../../models/Product"
import dbConnect from "../../utils/db"
import { Store, reactions } from "../../utils/Store"
import { BiArrowToLeft } from "react-icons/bi"

import { ParsedUrlQuery } from "querystring"

export default function ProductScreen(props: { product: IProduct }) {
  const { product } = props
  const { state, dispatch } = useContext(Store) as any

  if (!product) {
    return (
      <Layout title="Product Not Found">
        Man, that sounds awesome, but I don&apos;t think we have that.
      </Layout>
    )
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (x: IProduct) => x.slug === product.slug
    )
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < quantity) {
      return toast.error(
        "Sorry. I guess that item was too cool, cuz it looks like we just sold out!"
      )
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })
    dispatch({ type: "CART_OPEN" })
    toast.success(
      `${product.name} added to your cart! ${
        reactions[Math.floor(Math.random() * reactions.length)]
      }`
    )
  }

  return (
    <Layout
      title={product.name}
      description={product.description}
      tags={product.tags}
      image={product.image}
      slug={product.slug}
    >
      <div className="py-2">
        <Link href="/products" passHref>
          <BiArrowToLeft className="relative text-2xl cursor-pointer hover:text-orange hover:scale-125" />
        </Link>
        <Link href="/products" className="hover:text-Green">
          back to products
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={1024}
            height={768}
            className="object-contain"
          ></Image>
        </div>
        <div className="leading-10">
          <ul>
            <li>
              <h1 className="text-2xl font-extralight mb-4 pb-0 border-b-2 text-center border-b-orange drop-shadow">
                {product.name}
              </h1>
            </li>
            <li className="drop-shadow">
              <span className="text-orange text-sm border-l-4 border-t-4 border-orange p-2">
                Category:
              </span>
              <span className="inline">{product.category}</span>
            </li>
            <li className="mt-2 drop-shadow whitespace-pre-wrap">
              <span className="text-orange inline text-sm border-l-4 border-orange p-2 mb-2">
                Tags:
              </span>
              <span className="inline">{product.tags}</span>
            </li>
            <li className="mt-4 drop-shadow border-orange border-b-4 border-r-4 rounded-md p-2">
              <span className="text-sm p-2 text-orange">Description:</span>{" "}
              <span>{product.description}</span>
            </li>
          </ul>
        </div>
        <Card className="drop-shadow leading-5">
          <div className="card p-5">
            <div className="mb-2 flex justify-center">
              <div className="text-orange p-2">Price</div>
              <div className="text-lg p-2">${product.price}</div>
            </div>
            <div className="mb-2 flex justify-center">
              <div className="text-orange p-2 text-left">In Stock? </div>
              <div className="m-2 text-center">
                {product.countInStock > 0
                  ? "Yeah, we've got at least one!"
                  : "Dang Nabbit, I think we sold 'em all!"}
              </div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context: { params: IParams }) {
  const { params } = context
  const { slug } = params

  await dbConnect()
  const product = await Product.findOne({ slug }).lean()

  return {
    props: {
      product: product ? JSON.parse(JSON.stringify(product)) : null,
    },
  }
}

interface IParams extends ParsedUrlQuery {
  slug: string
}
