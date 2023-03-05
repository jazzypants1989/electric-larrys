import CategoryItem from "./CategoryItem"

const categories = [
  "Movies / TV",
  "Video Games",
  "Music",
  "Books",
  "Board Games",
  "Oddities",
] as const

const CategoryList = () => {
  return (
    <div className="flex flex-col items-center justify-center md:mt-3">
      <h3 className="text-center text-3xl font-bold drop-shadow md:mb-4">
        Categories
      </h3>
      <div className="mx-2 grid grid-cols-3 gap-x-20 md:m-1 md:gap-0 md:gap-y-5 lg:grid-cols-6 lg:gap-x-10">
        {categories.map((category) => (
          <CategoryItem key={category} category={category} />
        ))}
      </div>
    </div>
  )
}

export default CategoryList
