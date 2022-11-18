import axios from "axios"
import { toast } from "react-toastify"
import Layout from "../components/Layout"
import ProductItem from "../components/ProductItem"
import IndexSideBar from "../components/IndexSideBar"
import Announcement from "../components/Announcement"
import Categories from "../components/Categories"
import Slider from "../components/Slider"
import AnnouncementModel from "../models/Announcement"
import Post from "../models/SliderPost"
import Product from "../models/Product"
import dbConnect from "../utils/db"
import { Store, reactions } from "../utils/Store"
import { useContext } from "react"
import Newsletter from "../components/Newsletter"

export default function Home({ announcements, posts, products }) {
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
    dispatch({ type: "CART_OPEN" })

    toast.success(
      `${product.name} added to your cart! ${
        reactions[Math.floor(Math.random() * reactions.length)]
      }`
    )
  }

  let publishedPosts = posts.filter((post) => post.isPublished)
  let featuredPosts = publishedPosts.filter((post) => post.isFeatured)
  let nonFeaturedPosts = publishedPosts
    .filter((post) => !post.isFeatured)
    .slice(0, 4)
  let featuredProducts = products
    .filter((product) => product.isFeatured)
    .slice(0, 4)
  let announcementList = announcements.map((announcement) => (
    <Announcement key={announcement._id} announcement={announcement} />
  ))

  return (
    <>
      <div
        onClick={() => dispatch({ type: "CART_CLOSE" })}
        className="flex flex-col justify-center items-center min-w-screen bg-blue"
      >
        {announcementList}
      </div>
      <Layout title="Home">
        <aside className="-translate-x-4 md:translate-x-2 overflow-hidden">
          <Slider sliderPosts={featuredPosts} />
        </aside>
        <Categories />
        <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <IndexSideBar sideBarPosts={nonFeaturedPosts} />
          <div className="flex m-2 gap-2 flex-col justify-center items-center">
            {featuredProducts.length > 0 && (
              <div className="flex flex-col justify-center items-center lg:-translate-y-2">
                <h1 className="text-3xl font-bold text-center drop-shadow my-4">
                  Featured Products
                </h1>
                <div className="bg-orange bg-opacity-70 hover:bg-opacity-80 rounded-l-full flex flex-col justify-center items-center">
                  {featuredProducts.map((product) => (
                    <ProductItem
                      key={product._id}
                      product={product}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
        <Newsletter />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  await dbConnect()
  const products = await Product.find({}).lean()
  const posts = await Post.find({}).lean()
  const announcements = await AnnouncementModel.find({}).lean()

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      posts: JSON.parse(JSON.stringify(posts)),
      announcements: JSON.parse(JSON.stringify(announcements)),
    },
  }
}
