import Image from "next/image"
import Link from "next/link"

function imageLinkBuilder(image: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const imageLink = `https://res.cloudinary.com/${cloudName}/image/upload/${image}`
  return imageLink
}

const boardgames = "boardgames_owxhlz"
const books = "books_l4ph7g"
const movies = "movies_e5cayu"
const music = "music_umetmu"
const oddities = "oddities_n8vvjp"
const vidya = "vidya_jh1fbk"

const images = {
  "Movies / TV": movies,
  "Video Games": vidya,
  "Music": music,
  "Books": books,
  "Board Games": boardgames,
  "Oddities": oddities,
} as const

const CategoryItem = ({ category }: { category: keyof typeof images }) => {
  let categoryToLowerCase = category.toLowerCase()

  return (
    <div className="flex animate-swoosh flex-col items-center justify-center">
      <Link
        href={`/products?category=${categoryToLowerCase}`}
        className="m-1 flex flex-col items-center justify-center"
      >
        <div className="relative aspect-square h-40 w-40 overflow-hidden rounded-lg md:h-60 md:w-60">
          <Image
            src={imageLinkBuilder(images[category])}
            alt={category}
            width={400}
            height={400}
            className="invisible aspect-square rounded-lg hover:blur-md md:visible md:transition-all md:duration-1000 md:ease-in-out"
          />
        </div>
        <h4 className="absolute mt-0 rounded-full bg-orange bg-opacity-50 p-3 text-center text-base drop-shadow transition-all duration-500 ease-in-out hover:scale-125 hover:bg-opacity-100 hover:blur-none md:mt-4 md:bg-blue md:bg-opacity-50">
          {category}
        </h4>
      </Link>
    </div>
  )
}

export default CategoryItem
