import axios from "axios"
import { useContext, useCallback, useState, useEffect, ReactNode } from "react"
import { toast } from "react-toastify"
import Layout from "../components/Layout"
import ProductItem from "../components/Products/ProductItem"
import TagBox from "../components/Products/TagBox"
import SortBox from "../components/Products/SortBox"
import CategoryBox from "../components/Products/CategoryBox"
import Product, { IProduct } from "../models/Product"
import dbConnect from "../utils/db"
import { Store, reactions } from "../utils/Store"

export default function Home({
  products,
  queryCategory,
  queryTag,
}: {
  products: IProduct[]
  queryCategory: string
  queryTag: string
}) {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const [category, setCategory] = useState(queryCategory || "")
  const [tag, setTag] = useState(queryTag ? queryTag.split(",") : [])
  const [sort, setSort] = useState("")
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

  const categories = products.reduce((acc: string[], product: IProduct) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category.toLowerCase())
    }
    let uniqueCategories = [...new Set(acc)]
    return uniqueCategories
  }, [])

  const tags = products.reduce((acc: string[], product: IProduct) => {
    if (!acc.includes(product.tags.toLowerCase())) {
      acc.push(product.tags)
    }
    let splitTags = acc.map((tag) => tag.split(","))
    let flattenedTags = [...new Set(splitTags.flat())]
    let sortedTags = flattenedTags.sort()
    let uniqueSortedTags = [...new Set(sortedTags)]
    return uniqueSortedTags.filter((tag) => tag !== "")
  }, [])

  const filterProducts = (products: IProduct[]) => {
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
    (a: IProduct, b: IProduct) => {
      if (sort === "lowest") {
        if (a.price < b.price) {
          return -1
        } else {
          return 1
        }
      } else if (sort === "highest") {
        if (a.price > b.price) {
          return -1
        } else {
          return 1
        }
      } else if (sort === "newest") {
        if (a.createdAt > b.createdAt) {
          return -1
        } else {
          return 1
        }
      } else if (sort === "oldest") {
        if (a.createdAt < b.createdAt) {
          return -1
        } else {
          return 1
        }
      } else {
        return 0
      }
    },
    [sort]
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

  let cheese: ReactNode

  switch (true) {
    case category.length > 0 && tag.length > 2:
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {category}, specifically{" "}
            {tag.map((t) => t + ", ").slice(0, -1)}
            {" and " + tag[tag.length - 1]}? Well, aren&apos;t you picky?
          </h2>
          <button
            onClick={clearFilter}
            className="primary-button mx-auto block bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    case category.length > 0 && tag.length > 1:
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {category}, specifically{" "}
            {tag[0] + " and " + tag[1]}?
          </h2>
          <button
            onClick={clearFilter}
            className="primary-button mx-auto block bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    case category.length > 0 && tag.length > 0:
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {category}, specifically {tag[0]}?
          </h2>
          <button
            onClick={clearFilter}
            className="primary-button mx-auto block bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    case tag.length > 2 && category === "":
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {tag.map((t) => t + ", ").slice(0, -1)}
            {" and " + tag[tag.length - 1]}? Well, aren&apos;t you picky?
          </h2>
          <button
            onClick={clearFilter}
            className="primary-button mx-auto block bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    case tag.length > 1 && category === "":
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {tag[0]}, specifically with {tag[1]}?
          </h2>
          <button
            onClick={clearFilter}
            className="primary-button mx-auto block bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    case tag.length > 0 && category === "":
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some{tag[0]}?
          </h2>
          <button
            onClick={clearFilter}
            className="primary-button mx-auto block bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    case category.length > 0:
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {category}?
          </h2>
          <button
            onClick={clearFilter}
            className="primary-button mx-auto block bg-Red"
          >
            Clear Filter
          </button>
        </>
      )
      break
    default:
      cheese = (
        <h1 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
          You found my not-so-secret stash!
        </h1>
      )
  }

  useEffect(() => {
    if (queryTag) {
      setTag([queryTag])
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
          <h3 className="m-4 text-center text-lg text-Yellow drop-shadow md:text-3xl">
            We have a lot of crazy stuff, but we don&apos;t have that.
          </h3>
        </div>
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-3 lg:grid-cols-4">
        <div className="z-20 col-span-1 flex -translate-x-2 animate-woosh flex-col">
          <SortBox setSort={setSort} />
          <CategoryBox
            categories={categories}
            category={category}
            setCategory={setCategory}
          />
          <TagBox tags={tags} setTag={setTag} />

          {showClearFilter() && (
            <button
              type="button"
              onClick={clearFilter}
              className="default-button -z-10 w-3/5 translate-x-8 items-center text-sm font-thin text-orange"
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
          className="primary-button mx-auto mt-4 flex w-3/5 justify-center text-sm font-thin"
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
