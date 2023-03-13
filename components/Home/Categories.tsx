import CategoryItem from "./CategoryItem"

const categories = [
  "Media",
  "Games",
  "Toys",
  "Books",
  "Clothing",
  "Oddities",
] as const

const CategoryList = () => {
  return (
    <div className="mx-2 flex flex-col items-center justify-center">
      <h3 className="text-center text-3xl font-bold drop-shadow">Categories</h3>
      <div className="grid grid-cols-3 gap-x-20 md:m-1 md:gap-0 md:gap-y-2 lg:grid-cols-6 lg:gap-x-2">
        {categories.map((category) => (
          <CategoryItem key={category} category={category} />
        ))}
      </div>
    </div>
  )
}

export default CategoryList
