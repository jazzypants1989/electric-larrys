import Slider from "../components/Home/Slider"
import IndexSideBar from "../components/Home/IndexSideBar"
import Announcement from "../components/Home/Announcement"
import Categories from "../components/Home/Categories"
import Newsletter from "../components/Home/Newsletter"
import FeaturedProducts from "../components/Home/FeaturedProducts"

import { getAllAnnouncements } from "../utils/dataHooks/getAllAnnouncements"
import { getFeaturedPosts } from "../utils/dataHooks/getFeaturedPosts"
import { getNonFeaturedPosts } from "../utils/dataHooks/getNonFeaturedPosts"
import { getFeaturedProducts } from "../utils/dataHooks/getFeaturedProducts"

import type { Announcement as IAnnouncement } from "@/types"

export const revalidate = 10

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
      <div className="max-w-screen flex w-full flex-col items-center justify-center gap-1 px-2">
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
          <div className="mt-4 flex flex-col items-center justify-center gap-2 overflow-hidden md:mt-0 md:justify-start">
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
