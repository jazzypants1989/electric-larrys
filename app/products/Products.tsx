"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import ProductItem from "../../components/Products/ProductItem"
import SortBox from "../../components/Products/SortBox"
import Cheese from "../../components/Products/Cheese"
import CategoryBox from "../../components/Products/CategoryBox"
import TagBox from "../../components/Products/TagBox"
import Button from "../../components/Layout/Button"
import Spinner from "../../components/Layout/Spinner"

import type { Products, Product } from "@/types"

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
  const querySearch = searchParams?.get("search")

  const [category, setCategory] = useState(queryCategory || "")
  const [tag, setTag] = useState(queryTag ? queryTag.split(",") : [])
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(1)
  const [expand, setExpand] = useState(true)

  const [searching, setSearching] = useState(false)

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

  const [shownProducts, setShownProducts] = useState(() => sortedProducts)

  function filterProducts(products: Products) {
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
            product.tags.filter(
              (tag: string) => tag.toLowerCase() === t.toLowerCase()
            ).length > 0
        )
      )
    }
    if (sort) {
      products = products.sort(sortCallback)
    }

    return products
  }

  const clearFilter = () => {
    setCategory("")
    setTag([])
    setSort("")
    setPage(1)
    setShownProducts(sortedProducts)
  }

  const showClearFilter = () => {
    if (category.length > 0 && tag.length > 0) {
      return true
    } else {
      return false
    }
  }

  const router = useRouter()

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

  const searchProducts = async (searchTerm: string) => {
    const data = await fetch(`/api/search?search=${searchTerm}`)
    const newProducts = await data.json()

    setShownProducts(newProducts)
    setSearching(false)
  }

  useEffect(() => {
    if (queryCategory) {
      setCategory(queryCategory)
    }
    if (queryTag) {
      setTag(queryTag.split(","))
    }
    if (querySearch) {
      setSearching(true)
      searchProducts(querySearch)
      setPage(2)
      setSort("")
    }
  }, [queryCategory, queryTag, querySearch]) // eslint-disable-line react-hooks/exhaustive-deps

  if (searching) {
    return (
      <div className="flex items-center justify-center">
        <h3 className="m-4 text-center text-lg text-Yellow drop-shadow md:text-3xl">
          Searching...
        </h3>
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <Cheese
        search={querySearch}
        category={category}
        tag={tag}
        clearFilter={clearFilter}
      />
      {querySearch && querySearch.length > 0 && (
        <div className="flex items-center justify-center">
          <Button
            type="button"
            onClick={() => {
              router.push("/products")
              getProducts(1)
            }}
            className="bg-Yellow text-sm font-thin text-orange"
          >
            Clear Search
          </Button>
        </div>
      )}
      {sortedProducts.length === 0 && (
        <div className="flex justify-center">
          <h3 className="m-4 text-center text-lg text-Yellow drop-shadow md:text-3xl">
            We have a lot of crazy stuff, but we don&apos;t have that.
          </h3>
        </div>
      )}

      {shownProducts.length === 0 && querySearch && (
        <div className="flex justify-center">
          <h3 className="m-4 text-center text-lg text-Yellow drop-shadow md:text-3xl">
            We have a lot of crazy stuff, but it looks like we don&apos;t have{" "}
            {`${querySearch}`} in our inventory.
          </h3>
        </div>
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-3 lg:grid-cols-4">
        <div className="z-20 col-span-1 flex animate-woosh flex-col items-center justify-start md:items-center">
          <Button
            type="button"
            onClick={() => setExpand(!expand)}
            className="m-4 w-fit bg-Yellow text-sm font-thin text-orange md:hidden"
          >
            {expand ? "Hide Filters" : "Show Filters"}
          </Button>
          {expand && (
            <>
              <SortBox setSort={setSort} />
              <CategoryBox
                categories={categories}
                category={category}
                setCategory={setCategory}
              />
              {category !== "all" && category !== "" && (
                <Button
                  type="button"
                  onClick={() => setCategory("")}
                  className="-z-10 w-3/5 items-center bg-Yellow text-sm font-thin text-orange"
                >
                  Clear Category
                </Button>
              )}
              <TagBox tags={tags} setTag={setTag} tag={tag} />
              {showClearFilter() && (
                <Button
                  type="button"
                  onClick={clearFilter}
                  className="-z-10 m-2 w-3/5 bg-Yellow text-sm font-thin text-orange "
                >
                  Clear All Filters
                </Button>
              )}
            </>
          )}
        </div>
        {page === 1 &&
          sortedProducts.map((product: Product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        {page > 1 &&
          shownProducts.map((product: Product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        {sortedProducts.length === 20 && (
          <Button
            onClick={() => getProducts(page + 1)}
            className=""
            type="button"
          >
            Load More
          </Button>
        )}
      </div>
    </>
  )
}
