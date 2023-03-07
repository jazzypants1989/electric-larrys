import Slider from "../components/Home/Slider"
import IndexSideBar from "../components/Home/IndexSideBar"
import Announcement from "../components/Home/Announcement"
import Categories from "../components/Home/Categories"
import Newsletter from "../components/Home/Newsletter"
import FeaturedProducts from "../components/Home/FeaturedProducts"

import {
  getAllAnnouncements,
  IAnnouncement,
} from "../utils/dataHooks/getAllAnnouncements"
import { getFeaturedPosts } from "../utils/dataHooks/getFeaturedPosts"
import { getNonFeaturedPosts } from "../utils/dataHooks/getNonFeaturedPosts"
import { getFeaturedProducts } from "../utils/dataHooks/getFeaturedProducts"

export const revalidate = 10

export const metadata = {
  title: "Electric Larry's",
  applicationName: "Electric Larry's",
  description:
    "Electric Larry's is a small business in Carbondale, Illinois. We sell a variety of oddities, antiques, and collectibles.",
  keywords:
    "antiques, collectibles, oddities, Carbondale, Illinois, small business",
  authors: { name: "Jesse Pence", url: "https://jazzypants.dev" },
  themeColor: "#0050C0",
  creator: "Jesse Pence, Randall Majors, Meagan Majors",
  publisher: "Jesse Pence",
  generator: "electriclarrys.vercel.app",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default async function Route() {
  const announcements = await getAllAnnouncements()
  const featuredPosts = await getFeaturedPosts()
  const nonFeaturedPosts = await getNonFeaturedPosts()
  const featuredProducts = await getFeaturedProducts()

  const announcementList = announcements.map((announcement: IAnnouncement) => (
    <Announcement key={announcement.id} announcement={announcement} />
  ))

  return (
    <main className="flex flex-col items-center justify-center overflow-x-hidden">
      <div className="max-w-screen flex w-full flex-col items-center justify-center gap-1 bg-blue px-2">
        {announcementList}
      </div>
      {featuredPosts.length > 0 && (
        <aside className="mx-auto w-full overflow-hidden">
          <Slider sliderPosts={featuredPosts} />
        </aside>
      )}
      <Categories />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {featuredProducts.length > 0 && (
          <div className="mt-4 flex flex-col items-center justify-center gap-2 overflow-hidden md:mt-0">
            <FeaturedProducts featuredProducts={featuredProducts} />
          </div>
        )}
        {nonFeaturedPosts.length > 0 && (
          <div className="mx-auto lg:mx-0">
            <IndexSideBar sideBarPosts={nonFeaturedPosts} />
          </div>
        )}
      </section>
      <Newsletter />
    </main>
  )
}
