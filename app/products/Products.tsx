"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Product, Products } from "../../utils/dataHooks/getProducts"
import ProductItem from "../../components/Products/ProductItem"
import SortBox from "../../components/Products/SortBox"
import Cheese from "../../components/Products/Cheese"
import CategoryBox from "../../components/Products/CategoryBox"
import TagBox from "../../components/Products/TagBox"
import Button from "../../components/Layout/Button"

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

  const searchProducts = (searchTerm: string) => {
    const newProducts = products.filter(
      (product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setShownProducts(newProducts)
  }

  useEffect(() => {
    if (queryCategory) {
      setCategory(queryCategory)
    }
    if (queryTag) {
      setTag(queryTag.split(","))
    }
    if (querySearch) {
      searchProducts(querySearch)
      setPage(2)
      setSort("")
    }
  }, [queryCategory, queryTag, querySearch]) // eslint-disable-line react-hooks/exhaustive-deps

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

      {shownProducts.length === 0 && querySearch && (
        <div className="flex justify-center">
          <h3 className="m-4 text-center text-lg text-Yellow drop-shadow md:text-3xl">
            We have a lot of crazy stuff, but it looks like we don&apos;t have{" "}
            {`${querySearch}`} in our inventory.
          </h3>
          <Button type="button" onClick={() => getProducts(1)}>
            Clear Search
          </Button>
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
            <Button
              type="button"
              onClick={clearFilter}
              className="-z-10 w-3/5 translate-x-8 items-center bg-Yellow text-sm font-thin text-orange"
            >
              Clear Filter
            </Button>
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

        {showClearFilter() && (
          <Button
            type="button"
            onClick={clearFilter}
            className="mx-auto h-10 bg-Yellow text-sm font-thin text-orange"
          >
            Clear Filter
          </Button>
        )}
        {sortedProducts.length > 20 && (
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
