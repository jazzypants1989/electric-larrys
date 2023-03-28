import Image from "next/image"
import Link from "next/link"

function imageLinkBuilder(image: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const imageLink = `https://res.cloudinary.com/${cloudName}/image/upload/${image}`
  return imageLink
}

const images = {
  "Movies/TV": "e_improve/v1678404453/movies.jpg",
  "Video Games":
    "/w_1000,ar_1:1,c_fill,g_auto,e_improve/v1678403243/video-games.jpg",
  "Board Games":
    "/w_1000,ar_1:1,c_fill,g_auto,e_improve/v1678403244/board-games.jpg",
  "Toys": "/w_1000,ar_1:1,c_fill,g_auto,e_improve/v1678403245/toys.jpg",
  "Books": "/w_1000,ar_1:1,c_fill,g_auto,e_improve/v1678403245/books.jpg",
  "Pop Culture":
    "/w_1000,ar_1:1,c_fill,g_auto,e_improve/v1678403245/pop-culture.jpg",
} as const

const CategoryItem = ({ category }: { category: keyof typeof images }) => {
  let categoryToLowerCase = category.toLowerCase()

  return (
    <Link
      href={`/products?category=${categoryToLowerCase}`}
      className="flex animate-swoosh flex-col items-center justify-center"
    >
      <Image
        src={imageLinkBuilder(images[category])}
        alt={category}
        width={250}
        height={200}
        className="hidden aspect-square rounded-2xl hover:blur-md md:mx-4 md:block md:transition-all md:duration-1000 md:ease-in-out"
      />
      <h4 className="rounded-full bg-orange bg-opacity-30 p-6 text-center text-base drop-shadow transition-all duration-500 ease-in-out hover:scale-125 hover:bg-opacity-100 hover:blur-none md:absolute md:m-0 md:bg-blue md:bg-opacity-50">
        {category}
      </h4>
    </Link>
  )
}

export default CategoryItem
