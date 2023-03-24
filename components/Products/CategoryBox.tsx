import { useEffect, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { ReactNode } from "react"

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="mx-auto w-full max-w-xs">{children}</div>
    </div>
  )
}

export default function CategoryBox({
  category,
  categories,
  setCategory,
}: {
  category: string
  categories: string[]
  // eslint-disable-next-line no-unused-vars
  setCategory: (category: string) => void
}) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const handleChange = (e: string) => {
    setSelectedCategory(e)
    setCategory(e)
  }

  useEffect(() => {
    if (category === "") {
      setSelectedCategory("All")
    } else {
      setSelectedCategory(category)
    }
  }, [category])

  return (
    <Container>
      <Listbox
        as="div"
        value={selectedCategory}
        onChange={handleChange}
        className="relative w-full text-sm lg:text-base"
      >
        {({ open }) => (
          <>
            <div className="w-48">
              <span className="inline-block w-48">
                <Listbox.Label className="font-base w-full text-sm">
                  Category
                </Listbox.Label>

                <Listbox.Button className="focus:shadow-outline-blue relative w-full rounded border border-Green py-2 pl-3 text-left text-Green shadow-sm transition-all duration-300 ease-in-out hover:text-orange focus:border-orange focus:outline-none">
                  <span className="block truncate">{selectedCategory}</span>
                </Listbox.Button>
              </span>
              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-60 w-48 overflow-y-auto overflow-x-hidden rounded border border-Green bg-blue leading-6 shadow-lg"
                >
                  {categories &&
                    categories.map((category: string) => (
                      <Listbox.Option key={category} value={category}>
                        {({ selected, active }) => (
                          <div
                            className={`${
                              active
                                ? "bg-orange text-blue transition-all duration-300 ease-in-out"
                                : "text-Green transition-all duration-300 ease-in-out hover:text-blue"
                            } relative cursor-pointer select-none py-2 pl-10 pr-4`}
                          >
                            <span
                              className={`${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {category}
                            </span>

                            {selected && (
                              <span
                                className={`${
                                  active
                                    ? "text-blue transition-all duration-300 ease-in-out"
                                    : "text-orange transition-all duration-300 ease-in-out"
                                } absolute inset-y-0 left-0 flex items-center pl-2`}
                              >
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </Container>
  )
}
