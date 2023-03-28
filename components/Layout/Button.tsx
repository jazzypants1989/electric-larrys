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
  const text = className?.includes("text-") ? "" : "text-Yellow"

  return (
    <button
      className={`rounded bg-orange py-2 px-4 text-sm font-thin tracking-widest ${text} shadow outline-none transition-all duration-500 ease-in-out hover:rounded-xl hover:bg-Green hover:text-blue hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-Green focus:ring-offset-2 focus:ring-offset-Yellow ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
