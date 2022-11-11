import Image from "next/image"
import { buildUrl } from "cloudinary-build-url"
import { useRouter } from "next/router"

function imageLinkBuilder(image) {
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
}

const CategoryItem = ({ category }) => {
  const router = useRouter()
  let categoryToLowerCase = category.toLowerCase()

  const handleClick = () => {
    router.push(`/products?category=${categoryToLowerCase}`)
  }

  return (
    <div className="sm:w-20 sm:h-20 md:w-fit md:h-fit flex flex-col items-center justify-center animate-swoosh">
      <button
        onClick={handleClick}
        className="flex flex-col items-center justify-center m-1"
      >
        <Image
          src={imageLinkBuilder(images[category])}
          alt={category}
          width={250}
          height={250}
          className="invisible md:visible object-fill hover:blur-md md:transition-all md:duration-1000 md:ease-in-out rounded-lg"
        />
        <h1 className="mt-0 absolute bg-opacity-50 md:bg-opacity-50 bg-orange md:bg-blue p-3 rounded-full text-center drop-shadow md:mt-4 hover:blur-none hover:bg-opacity-100 hover:scale-125 transition-all duration-500 ease-in-out">
          {category}
        </h1>
      </button>
    </div>
  )
}

export default CategoryItem
