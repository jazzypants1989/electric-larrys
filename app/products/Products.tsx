"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Product, Products } from "../../utils/dataHooks/getProducts"
import ProductItem from "../../components/Products/ProductItem"
import SortBox from "../../components/Products/SortBox"
import Cheese from "../../components/Products/Cheese"
import CategoryBox from "../../components/Products/CategoryBox"
import TagBox from "../../components/Products/TagBox"

export default function ProductsComponent({
  products,
  categories,
  tags,
}: {
  products: Products
  categories: string[]
  tags: string[]
}) {
  const searchParams = useSearchParams()

  const queryCategory = searchParams?.get("category")
  const queryTag = searchParams?.get("tag")

  const [category, setCategory] = useState(queryCategory || "")
  const [tag, setTag] = useState(queryTag ? queryTag.split(",") : [])
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (queryCategory) {
      setCategory(queryCategory)
    }
    if (queryTag) {
      setTag(queryTag.split(","))
    }
  }, [queryCategory, queryTag])

  const filterProducts = (products: Products) => {
    if (category) {
      products = products.filter(
        (product: Product) =>
          product.category.toLowerCase() === category.toLowerCase()
      )
    }
    if (tag) {
      products = products.filter((product: Product) =>
        tag.every(
          (t) =>
            product.tags.filter((tag) => tag.toLowerCase() === t.toLowerCase())
              .length > 0
        )
      )
    }
    if (sort) {
      products = products.sort(sortCallback)
    }

    return products
  }

  const sortCallback = useCallback(
    (a: Product, b: Product) => {
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
      } else {
        return 0
      }
    },
    [sort]
  )

  const filteredProducts = filterProducts(products)
  const sortedProducts = filteredProducts.sort(sortCallback).slice(0, 20)

  const [shownProducts, setShownProducts] = useState(() => sortedProducts)

  const clearFilter = () => {
    setCategory("")
    setTag([])
    setSort("")
    setPage(1)
    setShownProducts(sortedProducts)
  }

  const showClearFilter = () => {
    if (category.length > 0 || tag.length > 0) {
      return true
    } else {
      return false
    }
  }

  const getProducts = (pageParam: number) => {
    console.log(`page is ${page}, pageParam is ${pageParam}`)
    if (pageParam === 1) {
      setShownProducts(sortedProducts)
    } else {
      const newProducts = filterProducts(products)
        .sort(sortCallback)
        .slice(0, pageParam * 20)
      setShownProducts(newProducts)
    }
    setPage(pageParam)
  }

  return (
    <>
      <Cheese category={category} tag={tag} clearFilter={clearFilter} />
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
        {page === 1 &&
          sortedProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        {page > 1 &&
          shownProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}

        {showClearFilter() && (
          <button
            type="button"
            onClick={clearFilter}
            className="primary-button mx-auto mt-4 flex w-3/5 justify-center text-sm font-thin"
          >
            Clear Filter
          </button>
        )}
        {filteredProducts.length > 20 && (
          <div className="flex h-auto w-full items-center justify-center">
            <button
              onClick={() => getProducts(page + 1)}
              className="primary-button"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  )
}
