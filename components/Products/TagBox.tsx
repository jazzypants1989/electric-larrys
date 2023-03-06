"use client"

import { ReactNode, useState } from "react"
import { Combobox, Transition } from "@headlessui/react"
import CheckCircle from "./Icons/CheckCircle"

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center py-4 pl-7">
      <div className="mx-auto w-full max-w-xs">{children}</div>
    </div>
  )
}

export default function TagBox({
  tags,
  setTag,
}: {
  tags: string[]
  // eslint-disable-next-line no-unused-vars
  setTag: (tag: string[]) => void
}) {
  const [selectedTag, setSelectedTag] = useState<string[]>([])
  const [query, setQuery] = useState("")

  const filteredTag =
    query.length === 0
      ? tags
      : tags.filter((tag) => {
          return tag.toLowerCase().includes(query.toLowerCase())
        })

  const handleTagClick = (tag: string[]) => {
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
        className="z-10 flex w-full items-center justify-between p-0"
        multiple
      >
        {({ open }) => (
          <>
            <div className="ml-2 w-48">
              <span className="inline-block w-48">
                <Combobox.Label className="font-base w-full text-sm">
                  Tag
                </Combobox.Label>
                <Combobox.Input
                  className="focus:shadow-outline-blue relative w-full rounded border border-Green py-2 pl-3 text-left text-Green shadow-sm transition-all duration-300 ease-in-out hover:text-orange focus:border-orange focus:outline-none"
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
                  className="absolute mt-1 max-h-60 w-48 overflow-y-auto overflow-x-hidden rounded border border-Green bg-blue leading-6 shadow-lg"
                >
                  {uniqueList
                    .sort((a: string, b: string) =>
                      a.localeCompare(b.toLowerCase())
                    )
                    .filter((tag: string) => tag !== "")
                    .map((tag: string) => (
                      <Combobox.Option key={tag} value={tag}>
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
                                <CheckCircle />
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
      {selectedTag.length > 0 && selectedTag.join("") !== "" && (
        <ul className="grid-cols m-1 mt-3 grid p-1">
          {selectedTag.map(
            (tag: string) =>
              tag.length > 0 && (
                <li key={tag} className="flex items-center justify-between">
                  <span className="mt-1 rounded-full bg-orange px-3 py-1 text-sm font-medium text-Green">
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
