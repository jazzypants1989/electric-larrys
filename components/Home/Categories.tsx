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
    <div className="mt-3 flex flex-col items-center justify-center">
      <h3 className="mb-4 text-center text-3xl font-bold drop-shadow">
        Categories
      </h3>
      <div className="grid grid-cols-3 gap-y-5 gap-x-20 md:m-1 md:gap-0 lg:grid-cols-6">
        {categories.map((category) => (
          <CategoryItem key={category} category={category} />
        ))}
      </div>
    </div>
  )
}

export default CategoryList
