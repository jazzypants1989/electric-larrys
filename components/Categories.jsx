import CategoryItem from "./CategoryItem"

const categories = [
  "Movies / TV",
  "Video Games",
  "Music",
  "Books",
  "Board Games",
  "Oddities",
]

const CategoryList = () => {
  return (
    <div className="mt-3 mx-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mb-4 drop-shadow">
        Categories
      </h1>
      <div className="grid sm:gap-20 md:gap-0 md:m-1 grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <CategoryItem key={category} category={category} value={category} />
        ))}
      </div>
    </div>
  )
}

export default CategoryList
