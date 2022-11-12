import { useState } from "react"
import { Combobox, Transition } from "@headlessui/react"
import Container from "./Container"
import { CheckIcon } from "@heroicons/react/solid"

export default function TagBox({ tags, setTag }) {
  const [selectedTag, setSelectedTag] = useState([])
  const [query, setQuery] = useState([""])

  const filteredTag =
    query === ""
      ? tags
      : tags.filter((tag) => {
          return tag.split(" ").join("").toLowerCase().includes(query)
        })

  const handleTagClick = (tag) => {
    setSelectedTag(tag)
    setTag(tag)
  }

  let uniqueList = [...new Set(filteredTag)]

  return (
    <Container>
      <Combobox
        as="div"
        value={selectedTag}
        onChange={handleTagClick}
        className="flex items-center justify-between w-full p-0 z-10"
        multiple
      >
        {({ open }) => (
          <>
            <div className="w-48 ml-2">
              <span className="inline-block w-48">
                <Combobox.Label className="w-full text-sm font-base">
                  Tag
                </Combobox.Label>
                <Combobox.Input
                  className="pl-3 py-2 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-orange relative border shadow-sm border-Green rounded text-Green hover:text-orange transition-all duration-300 ease-in-out"
                  placeholder="Filter with tags"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </span>
              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options
                  static
                  className="border border-Green rounded mt-1 absolute w-48 bg-blue shadow-lg max-h-60 overflow-y-auto overflow-x-hidden leading-6"
                >
                  {uniqueList
                    .sort((a, b) => a.localeCompare(b.toLowerCase()))
                    .filter((tag) => tag !== "")
                    .map((tag) => (
                      <Combobox.Option key={tag} value={tag} static>
                        {({ selected, active }) => (
                          <div
                            className={`${
                              active
                                ? "text-blue bg-orange transition-all duration-300 ease-in-out"
                                : "text-Green hover:text-blue transition-all duration-300 ease-in-out"
                            } cursor-pointer select-none relative py-2 pl-10 pr-4`}
                          >
                            <span
                              className={`${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {tag}
                            </span>

                            {selected && (
                              <span
                                className={`${
                                  active
                                    ? "text-blue transition-all duration-300 ease-in-out"
                                    : "text-Green transition-all duration-300 ease-in-out"
                                }
                                                                absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </div>
                        )}
                      </Combobox.Option>
                    ))}
                </Combobox.Options>
              </Transition>
            </div>
          </>
        )}
      </Combobox>
      {selectedTag.length > 0 && (
        <ul className="grid mt-3 p-1 m-1 sm:grid-cols">
          {selectedTag.map(
            (tag) =>
              tag.length > 0 && (
                <li key={tag} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-Green bg-orange rounded-full px-3 py-1 mt-1">
                    {tag}
                  </span>
                </li>
              )
          )}
          <button
            className="delete-button pt-2"
            type="button"
            onClick={() => (setSelectedTag([]), setTag([]))}
          >
            Clear Tags
          </button>
        </ul>
      )}
    </Container>
  )
}
