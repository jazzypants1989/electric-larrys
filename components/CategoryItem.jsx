import Image from "next/image"
import { useRouter } from "next/router"
const boardgames = "../public/images/boardgames.jpg"
const books = "../public/images/books.jpg"
const movies = "../public/images/movies.jpeg"
const music = "../public/images/music.jpg"
const oddities = "../public/images/oddities.jpg"
const vidya = "../public/images/vidya.jpg"

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
          src={`/${images[category]}`}
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
