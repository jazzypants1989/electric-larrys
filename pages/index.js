import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import CategoryBox from "../components/CategoryBox"
import TagBox from "../components/TagBox"
import SortBox from "../components/SortBox"
import Layout from "../components/Layout"
import ProductItem from "../components/ProductItem"
import Product from "../models/Product"
import db from "../utils/db"
import { Store } from "../utils/Store"

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store)
  const { cart } = state

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
    return uniqueSortedTags
  }, [])

  const [category, setCategory] = useState("")
  const [tag, setTag] = useState("")
  const [sort, setSort] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(products)

  const handleSort = useCallback(
    (e) => {
      setSort(sort)
      setSortOrder(sortOrder)
      dispatch({ type: "SORT_BY_PRICE", payload: { sort, sortOrder } })
    },
    [sort, sortOrder]
  )

  const handleCategory = useCallback(
    (e) => {
      setCategory(category)
      dispatch({ type: "FILTER_BY_CATEGORY", payload: category })
    },
    [category]
  )

  const handleTag = useCallback(
    (e) => {
      setTag(tag)
      dispatch({ type: "FILTER_BY_TAG", payload: tag })
    },
    [tag]
  )

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.category.toLowerCase().includes(category)
      )
    )
  }, [category])

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.tags.toLowerCase().includes(tag))
    )
  }, [tag])

  useEffect(() => {
    setFilteredProducts(
      products.sort((a, b) =>
        sortOrder === "lowest" ? a.price - b.price : b.price - a.price
      )
    )
  }, [sort, sortOrder])

  return (
    <Layout title="Home">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-1/4">
          <CategoryBox
            categories={categories}
            handleCategory={handleCategory}
          />
          <TagBox tags={tags} handleTag={handleTag} />
          <SortBox handleSort={handleSort} />
        </div>
        <div className="flex flex-col w-full md:w-3/4">
          <div className="flex flex-wrap">
            {filteredProducts.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                addToCartHandler={addToCartHandler}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find({}).lean()
  await db.disconnect()
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  }
}

// Language: javascript
