import axios from "axios"
import { useContext, useCallback, useState, useEffect } from "react"
import { toast } from "react-toastify"
import Layout from "../components/Layout"
import ProductItem from "../components/Products/ProductItem"
import CategoryBox from "../components/Products/CategoryBox"
import TagBox from "../components/Products/TagBox"
import SortBox from "../components/Products/SortBox"
import Product from "../models/Product"
import dbConnect from "../utils/db"
import { Store, reactions } from "../utils/Store"

export default function Home({ products, queryCategory, queryTag }) {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const [category, setCategory] = useState(queryCategory || "")
  const [tag, setTag] = useState([])
  const [sort, setSort] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const [page, setPage] = useState(1)

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
    dispatch({ type: "CART_OPEN" })

    toast.success(
      `${product.name} added to your cart! ${
        reactions[Math.floor(Math.random() * reactions.length)]
      }`
    )
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
  const sortedProducts = filteredProducts.sort(sortCallback).slice(0, 20)
  const clearFilter = () => {
    setCategory("")
    setTag([])
  }

  const showClearFilter = () => {
    if (category.length > 0 || tag.length > 0) {
      return true
    } else {
      return false
    }
  }

  const getMoreProducts = (page) => {
    if (page === 1) {
      return products.slice(0, 20)
    } else {
      return products.slice(0, page * 20)
    }
  }

  let cheese = ""

  switch (true) {
    case category.length > 0 && tag.length > 2:
      cheese = (
        <>
          <h1 className="text-3xl mb-4 mt-2 text-center drop-shadow">
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
          <h1 className="text-3xl mb-4 mt-2 text-center drop-shadow">
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
          <h1 className="text-3xl mb-4 mt-2 text-center drop-shadow">
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
          <h1 className="text-3xl mb-4 mt-2 text-center drop-shadow">
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
          <h1 className="text-3xl mb-4 mt-2 text-center drop-shadow">
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
          <h1 className="text-3xl mb-4 mt-2 text-center drop-shadow">
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
          <h1 className="text-3xl mb-4 mt-2 text-center drop-shadow">
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
      cheese = (
        <h1 className="text-3xl mb-4 mt-2 text-center drop-shadow">
          You found my not-so-secret stash!
        </h1>
      )
  }

  useEffect(() => {
    if (queryTag) {
      setTag([" ", queryTag])
    }
    if (queryCategory) {
      setCategory(queryCategory)
    }
  }, [queryTag, queryCategory])

  return (
    <Layout title="Cool Stuff!">
      {cheese}
      {sortedProducts.length === 0 && (
        <div className="flex justify-center">
          <h1 className="text-3xl m-4 text-center drop-shadow text-Red">
            We have a lot of crazy stuff, but we don&apos;t have that.
          </h1>
        </div>
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
        <div className="z-20 flex flex-col -translate-x-2 col-span-1 animate-woosh">
          <SortBox setSort={setSort} setSortOrder={setSortOrder} />
          <CategoryBox
            categories={categories}
            category={category}
            setCategory={setCategory}
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
      {sortedProducts.length > 20 && (
        <div className="flex justify-center">
          <button
            onClick={() => getMoreProducts(setPage(page + 1))}
            className="primary-button"
          >
            Load More
          </button>
        </div>
      )}
      {showClearFilter() && (
        <button
          type="button"
          onClick={clearFilter}
          className="primary-button w-3/5 font-thin text-sm mx-auto mt-4 flex justify-center"
        >
          Clear Filter
        </button>
      )}
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  await dbConnect()
  const products = await Product.find({}).lean()
  const queryCategory = query.category ? query.category : ""
  const queryTag = query.tag ? query.tag : ""
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      queryCategory,
      queryTag,
    },
  }
}
