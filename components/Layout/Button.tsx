import { ReactNode } from "react"

export default function Button({
  children,
  className,
  onClick,
  type = "button",
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}) {
  return (
    <button
      className={`rounded bg-orange py-2 px-4 text-sm font-thin tracking-widest shadow outline-none transition-all duration-500 ease-in-out hover:rounded-xl hover:bg-Green hover:text-orange ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
