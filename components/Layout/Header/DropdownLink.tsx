import Link from "next/link"
import {
  AnchorHTMLAttributes,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
} from "react"

const DropdownLink = forwardRef((props, ref) => {
  const { href, children, ...rest }: any = props

  return (
    <Link
      href={href}
      className="relative isolate z-50 flex rounded-md p-2 tracking-widest text-Green mix-blend-normal transition-all duration-300 ease-in-out hover:bg-Green hover:text-blue hover:shadow-none"
      ref={ref as any}
      {...rest}
      style={{ mixBlendMode: "normal", zIndex: 9999999999999 }}
    >
      {children}
    </Link>
  )
})

DropdownLink.displayName = "DropdownLink"

export default DropdownLink as ILink

interface ILink extends ForwardRefExoticComponent<ILinkProps> {
  displayName: string
}

interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
}
