import Contact from "./Contact"
import Links from "./Links"
import FooterLogo from "./FooterLogo"

const Footer = () => {
  return (
    <div className="max-w-7xl h-fit drop-shadow flex items-center justify-center text-center mx-auto mt-4 md:mt-0 px-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Footer Area"
        className="grid md:grid-cols-3 gap-4 md:gap-8"
      >
        <FooterLogo />
        <Contact />
        <Links />
      </nav>
    </div>
  )
}
export default Footer
