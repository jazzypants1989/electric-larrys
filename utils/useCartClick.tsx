import { RefObject, useEffect } from "react"

export default function useCartClick(
  ref: RefObject<HTMLDivElement>,
  handler: (event: MouseEvent | TouchEvent) => void // eslint-disable-line
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element, it's descendent elements, or the add-to-cart button
      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        ((event.target as HTMLElement).className &&
          (event.target as HTMLElement).className.includes &&
          (event.target as HTMLElement).className.includes("add-to-cart")) ||
        ((event.target as HTMLElement).className &&
          (event.target as HTMLElement).className.includes &&
          (event.target as HTMLElement).className.includes("cart-buttons"))
      ) {
        return
      }
      handler(event)
    }
    document.addEventListener("pointerdown", listener)
    return () => {
      document.removeEventListener("pointerdown", listener)
    }
  }, [ref, handler])
}
