import axios from "axios"
import { useContext, useCallback, useState } from "react"
import { toast } from "react-toastify"
import Layout from "../components/Layout"
import ProductItem from "../components/ProductItem"
import Product from "../models/Product"
import db from "../utils/db"
import { Store } from "../utils/Store"
import CategoryBox from "../components/CategoryBox"
import TagBox from "../components/TagBox"
import SortBox from "../components/SortBox"

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const [category, setCategory] = useState("")
  const [tag, setTag] = useState("")
  const [sort, setSort] = useState("")
  const [sortOrder, setSortOrder] = useState("")

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < quantity) {
      return toast.error(
        "Sorry. I guess that item was too cool, cuz it looks like we are sold out."
      )
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })

    toast.success("Product added to the cart")
  }

  const categories = products.reduce((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category.toLowerCase())
    }
    let uniqueCategories = [...new Set(acc)]
    return uniqueCategories
  }, [])

  const tags = products.reduce((acc, product) => {
    if (!acc.includes(product.tags.toLowerCase())) {
      acc.push(product.tags)
    }
    let splitTags = acc.map((tag) => tag.split(","))
    let flattenedTags = [...new Set(splitTags.flat())]
    let sortedTags = flattenedTags.sort()
    let uniqueSortedTags = [...new Set(sortedTags)]
    return uniqueSortedTags.filter((tag) => tag !== "")
  }, [])

  const filterProducts = (products) => {
    if (category) {
      products = products.filter(
        (product) => product.category.toLowerCase() === category
      )
    }
    if (tag) {
      products = products.filter((product) =>
        tag.every((t) => product.tags.toLowerCase().includes(t.toLowerCase()))
      )
    }
    if (sort) {
      products = products.sort(sortCallback)
    }

    console.log(tag)
    return products
  }

  const sortCallback = useCallback(
    (a, b) => {
      if (sort === "lowest") {
        if (a.price > b.price) {
          return sortOrder === "asc" ? -1 : 1
        } else {
          return sortOrder === "asc" ? 1 : -1
        }
      }
      if (sort === "highest") {
        if (a.price < b.price) {
          return sortOrder === "asc" ? -1 : 1
        } else {
          return sortOrder === "asc" ? 1 : -1
        }
      }
      if (sort === "newest") {
        if (a.createdAt < b.createdAt) {
          return sortOrder === "asc" ? -1 : 1
        } else {
          return sortOrder === "asc" ? 1 : -1
        }
      }
      if (sort === "oldest") {
        if (a.createdAt > b.createdAt) {
          return sortOrder === "asc" ? -1 : 1
        } else {
          return sortOrder === "asc" ? 1 : -1
        }
      }
    },
    [sort, sortOrder]
  )

  const filteredProducts = filterProducts(products)
  const sortedProducts = filteredProducts.sort(sortCallback)
  const clearFilter = () => {
    setCategory("")
    setTag("")
  }

  const showClearFilter = () => {
    if (category || tag) {
      return true
    } else {
      return false
    }
  }

  let cheese = ""

  switch (true) {
    case category.length > 0 && tag.length > 2:
      cheese = (
        <>
          <h1 className="text-3xl mb-4 text-center">
            Oh, so you want some {category}, specifically{" "}
            {tag.map((t) => t + ", ").slice(0, -1)}
            {" and " + tag[tag.length - 1]}? Well, aren&apos;t you picky?
          </h1>
          <button
            onClick={clearFilter}
            className="bg-Red primary-button block mx-auto"
          >
            Clear Filter
          </button>
        </>
      )
      break
    case category.length > 0 && tag.length > 1:
      cheese = (
        <>
          <h1 className="text-3xl mb-4 text-center">
            Oh, so you want some {category}, specifically{" "}
            {tag[0] + " and " + tag[1]}?
          </h1>
          <button
            onClick={clearFilter}
            className="primary-button block mx-auto bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    case category.length > 0 && tag.length > 0:
      cheese = (
        <>
          <h1 className="text-3xl mb-4 text-center">
            Oh, so you want some {category}, specifically {tag[0]}?
          </h1>
          <button
            onClick={clearFilter}
            className="primary-button block mx-auto bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    case tag.length > 2 && category === "":
      cheese = (
        <>
          <h1 className="text-3xl mb-4 text-center">
            Oh, so you want some {tag.map((t) => t + ", ").slice(0, -1)}
            {" and " + tag[tag.length - 1]}? Well, aren&apos;t you picky?
          </h1>
          <button
            onClick={clearFilter}
            className="primary-button block mx-auto bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    case tag.length > 1 && category === "":
      cheese = (
        <>
          <h1 className="text-3xl mb-4 text-center">
            Oh, so you want some {tag[0]}, specifically with {tag[1]}?
          </h1>
          <button
            onClick={clearFilter}
            className="primary-button block mx-auto bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    case tag.length > 0 && category === "":
      cheese = (
        <>
          <h1 className="text-3xl mb-4 text-center">
            Oh, so you want some{tag[0]}?
          </h1>
          <button
            onClick={clearFilter}
            className="primary-button block mx-auto bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    case category.length > 0:
      cheese = (
        <>
          <h1 className="text-3xl mb-4 text-center">
            Oh, so you want some {category}?
          </h1>
          <button
            onClick={clearFilter}
            className="primary-button block mx-auto bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    default:
      cheese = <h1 className="text-3xl mb-4 text-center">Cool Stuff!</h1>
  }

  return (
    <Layout title="Cool Stuff!">
      {cheese}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="z-20 flex flex-col -translate-x-10 sm:col-span-1">
          <SortBox setSort={setSort} setSortOrder={setSortOrder} />
          <CategoryBox
            categories={categories}
            category={category}
            setCategory={setCategory}
            clearFilter={clearFilter}
          />
          <TagBox tags={tags} tag={tag} setTag={setTag} className="z-30" />

          {showClearFilter() && (
            <button
              type="button"
              onClick={clearFilter}
              className="default-button text-orange items-center translate-x-8 w-3/5 font-thin text-sm -z-10"
            >
              Clear Filter
            </button>
          )}
        </div>
        {sortedProducts.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  await db.connect()
  const products = await Product.find(
    query.slug ? { slug: query.slug } : {}
  ).lean()
  await db.disconnect()
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  }
}
