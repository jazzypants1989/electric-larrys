import Image from "next/image"
import { buildUrl } from "cloudinary-build-url"
import { useRouter } from "next/router"

function imageLinkBuilder(image: string) {
  const url = buildUrl(image, {
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
    transformations: {
      resize: {
        type: "fill",
        width: 250,
        height: 250,
      },
    },
  })
  return url
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
  const router = useRouter()

  let categoryToLowerCase = category.toLowerCase()

  const handleClick = () => {
    router.push(`/products?category=${categoryToLowerCase}`)
  }

  return (
    <div className="flex animate-swoosh flex-col items-center justify-center">
      <button
        onClick={handleClick}
        className="m-1 flex flex-col items-center justify-center"
      >
        <Image
          src={imageLinkBuilder(images[category])}
          alt={category}
          width={300}
          height={300}
          className="invisible rounded-lg object-fill hover:blur-md md:visible md:transition-all md:duration-1000 md:ease-in-out"
        />
        <h4 className="absolute mt-0 rounded-full bg-orange bg-opacity-50 p-3 text-center text-base drop-shadow transition-all duration-500 ease-in-out hover:scale-125 hover:bg-opacity-100 hover:blur-none md:mt-4 md:bg-blue md:bg-opacity-50">
          {category}
        </h4>
      </button>
    </div>
  )
}

export default CategoryItem
