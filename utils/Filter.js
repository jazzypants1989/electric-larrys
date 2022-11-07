import Product from "../models/Product"
import { db } from "../utils/db"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { useContext } from "react"
import { toast } from "react-toastify"
import CategoryBox from "../components/CategoryBox"
import TagBox from "../components/TagBox"
import SortBox from "../components/SortBox"
import Layout from "../components/Layout"
import ProductItem from "../components/ProductItem"
import Product from "../models/Product"
import db from "../utils/db"
import { Store } from "../utils/Store"

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find({}).lean()
  const categories = await Product.find({}).distinct("category")
  const tags = await Product.find({}).distinct("tags")
  await db.disconnect()
  return {
    props: {
      products: products.map(db.convertDocToObj),
      categories: categories.map(db.convertDocToObj),
      tags: tags.map(db.convertDocToObj),
    },
  }
}

const Filter = ({ products, categories, tags }) => {
  const [sort, setSort] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [sortProducts, setSortProducts] = useState([])
  const [category, setCategory] = useState("")
  const [tag, setTag] = useState("")
  const [categoryFilter, setCategoryFilter] = useState(categories)
  const [tagFilter, setTagFilter] = useState(tags)

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

  const handleSort = useCallback(
    (e) => {
      const value = e.target.value
      const [sort, sortOrder] = value.split("-")
      setSort(sort)
      setSortOrder(sortOrder)
    },
    [setSort, setSortOrder]
  )

  const sortCallback = (product1, product2) => {
    if (sort === "price") {
      if (sortOrder === "lowest") {
        return product1.price > product2.price ? 1 : -1
      } else {
        return product1.price < product2.price ? 1 : -1
      }
    } else {
      if (sortOrder === "lowest") {
        return product1.createdAt > product2.createdAt ? 1 : -1
      } else {
        return product1.createdAt < product2.createdAt ? 1 : -1
      }
    }
  }
  const filterProducts = (products) => {
    if (category) {
      products = products.filter(
        (product) => product.category.toLowerCase() === category
      )
    }
    if (tag) {
      products = products.filter((product) => product.tags.includes(tag))
    }
    return products
  }

  const filteredProducts = filterProducts(products)
  const sortedProducts = filteredProducts.sort(sortCallback)
  const clearFilter = () => {
    setCategory("")
    setTag("")
  }

  return (
    <Layout title="Filter Products">
      <div className="row">
        <div className="col-3">
          <h3>Filter Products</h3>
          <CategoryBox
            categories={categories}
            category={category}
            setCategory={setCategory}
          />
          <TagBox tags={tags} tag={tag} setTag={setTag} />
          <SortBox sort={sort} sortOrder={sortOrder} handleSort={handleSort} />
          <button className="btn btn-danger" onClick={clearFilter}>
            Clear Filter
          </button>
        </div>
        <div className="col-9">
          <h3>Products</h3>
          <div className="row">
            {sortedProducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Filter
