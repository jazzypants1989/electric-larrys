import { Menu } from "@headlessui/react"
import { useState } from "react"

export default function SortBox({ setSort }) {
  const [sortValue, setSortValue] = useState("")

  return (
    <Menu as="div" className="pl-9 mb-4 relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-Green bg-blue border border-Green rounded-md shadow-sm hover:text-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue transition-all duration-300 ease-in-out">
          Sort By: {sortValue}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5 7a1 1 0 011.707 0L10 10.586 13.293 7A1 1 0 1115 8.414l-4 4a1 1 0 01-1.414 0l-4-4A1 1 0 015 7z"
              clipRule="evenodd"
            />
          </svg>
        </Menu.Button>
      </div>

      <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-blue divide-y divide-Green rounded-md shadow-lg ring-1 ring-black ring-opacity-5 text-center align-middle justify-center focus:outline-none z-10">
        <div className="px-1 py-1 ">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => {
                  setSort("lowest")
                  setSortValue("Price - Low to High")
                }}
                className={`${
                  active ? "text-orange" : "text-Green"
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              >
                Price - Low to High
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => {
                  setSortValue("Price - High to Low")
                  setSort("highest")
                }}
                className={`${
                  active ? "text-orange" : "text-Green"
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              >
                Price - High to Low
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => {
                  setSortValue("What's New")
                  setSort("newest")
                }}
                className={`${
                  active ? "text-orange" : "text-green"
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              >
                What&apos;s New
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => {
                  setSortValue("What's Old")
                  setSort("oldest")
                }}
                className={`${
                  active ? "text-orange" : "text-Green"
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              >
                What&apos;s Old
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  )
}
