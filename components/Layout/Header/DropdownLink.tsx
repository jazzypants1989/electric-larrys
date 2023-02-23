import Link from "next/link"
import { ReactNode } from "react"

export default function DropdownLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex p-2 tracking-widest text-Green transition-all duration-300 ease-in-out hover:bg-Green hover:text-blue hover:shadow-none"
    >
      {children}
    </Link>
  )
}
