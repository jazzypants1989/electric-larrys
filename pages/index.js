import axios from "axios"
import { toast } from "react-toastify"
import Layout from "../components/Layout"
import ProductItem from "../components/ProductItem"
import AnnouncementModel from "../models/Announcement"
import Post from "../models/SliderPost"
import Product from "../models/Product"
import db from "../utils/db"
import { Store } from "../utils/Store"
import Announcement from "../components/Announcement"
import Slider from "../components/Slider"
import { useContext } from "react"

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

    toast.success("Product added to the cart")
  }

  let publishedPosts = posts.filter((post) => post.isPublished)
  let featuredPosts = publishedPosts.filter((post) => post.isFeatured)
  let featuredProducts = products.filter((product) => product.isFeatured)
  let announcementList = announcements.map((announcement) => (
    <Announcement key={announcement._id} announcement={announcement} />
  ))

  return (
    <>
      <div className="flex flex-col justify-center items-center min-w-screen bg-blue">
        {announcementList}
      </div>
      <Layout title="Home">
        <Slider sliderPosts={featuredPosts} />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  await db.connect()
  const products = await Product.find({}).lean()
  const posts = await Post.find({}).lean()
  const announcements = await AnnouncementModel.find({}).lean()
  await db.disconnect()

  return {
    props: {
      products: products.map(db.convertDocToObj),
      posts: posts.map(db.convertDocToObj),
      announcements: announcements.map(db.convertDocToObj),
    },
  }
}
