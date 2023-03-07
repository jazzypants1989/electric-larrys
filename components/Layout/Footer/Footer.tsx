import Contact from "./Contact"
import Links from "./Links"
import FooterLogo from "./FooterLogo"

const Footer = () => {
  return (
    <div className="mx-auto mt-4 flex h-fit max-w-7xl items-center justify-center px-6 text-center drop-shadow md:mt-0 md:px-4 lg:px-8">
      <nav
        aria-label="Footer Area"
        className="grid gap-4 md:grid-cols-3 md:gap-8"
      >
        <FooterLogo />
        <Contact />
        <Links />
      </nav>
    </div>
  )
}
export default Footer
