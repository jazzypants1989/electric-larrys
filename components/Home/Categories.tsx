import CategoryItem from "./CategoryItem"

const categories = [
  "Movies/TV",
  "Video Games",
  "Board Games",
  "Toys",
  "Books",
  "Pop Culture",
] as const

const CategoryList = () => {
  return (
    <div className="mx-2 flex flex-col items-center justify-center">
      <h3 className="text-center text-3xl font-bold tracking-wider drop-shadow">
        Categories
      </h3>
      <div className="grid grid-cols-3 gap-4 md:m-1 md:gap-x-1 md:gap-y-2 lg:grid-cols-6 lg:gap-x-2">
        {categories.map((category) => (
          <CategoryItem key={category} category={category} />
        ))}
      </div>
    </div>
  )
}

export default CategoryList
