import { ReactNode } from "react"
import Button from "../Layout/Button"

export default function Cheese({
  category,
  tag,
  clearFilter,
}: {
  category: string
  tag: string[]
  clearFilter: () => void
}) {
  let cheese: ReactNode

  switch (true) {
    case category.length > 0 && tag.length > 2:
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {category}, specifically{" "}
            {tag.map((t: string) => t + ", ").slice(0, -1)}
            {" and " + tag[tag.length - 1]}? Well, aren&apos;t you picky?
          </h2>
        </>
      )
      break
    case category.length > 0 && tag.length > 1:
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {category}, specifically{" "}
            {tag[0] + " and " + tag[1]}?
          </h2>
          <Button
            onClick={clearFilter}
            className="mx-auto block bg-Yellow text-orange hover:text-Black"
          >
            Clear Filter
          </Button>
        </>
      )
      break
    case category.length > 0 && tag.length > 0:
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {category}, specifically {tag[0]}?
          </h2>
        </>
      )
      break
    case tag.length > 2 && category === "":
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {tag.map((t: string) => t + ", ").slice(0, -1)}
            {" and " + tag[tag.length - 1]}? Well, aren&apos;t you picky?
          </h2>
        </>
      )
      break
    case tag.length > 1 && category === "":
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {tag[0]}, specifically with {tag[1]}?
          </h2>
        </>
      )
      break
    case tag.length > 0 && category === "":
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {tag[0]}?
          </h2>
        </>
      )
      break
    case category.length > 0:
      cheese = (
        <>
          <h2 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
            Oh, so you want some {category}?
          </h2>
        </>
      )
      break
    default:
      cheese = (
        <h1 className="mb-4 mt-2 text-center text-lg drop-shadow md:text-3xl">
          You found my not-so-secret stash!
        </h1>
      )
  }

  return <>{cheese}</>
}
