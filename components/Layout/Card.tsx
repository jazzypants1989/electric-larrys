import { ReactNode } from "react"

export default function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`mb-5 flex animate-swoosh flex-col items-center justify-center rounded-lg text-center shadow-lg transition-all duration-500 ease-in-out ${className}`}
    >
      {children}
    </div>
  )
}
