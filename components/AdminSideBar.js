import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

export default function AdminSideBar() {
  const { pathname } = useRouter()
  const isActive = (r) => (r === pathname ? "active" : "")

  const links = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      name: "Users",
      href: "/admin/users",
    },
    {
      name: "Products",
      href: "/admin/products",
    },
    {
      name: "Posts",
      href: "/admin/posts",
    },
    {
      name: "Announcements",
      href: "/admin/announcements",
    },
    {
      name: "Newsletter",
      href: "/admin/newsletter",
    },
    {
      name: "Stripe Dashboard",
      href: "https://dashboard.stripe.com/",
    },
  ]

  return (
    <div className="md:pr-4 flex flex-col w-fit max-h-screen lg:border-r border-orange drop-shadow">
      <div className="flex flex-col md:p-2">
        <div className="flex gap-4 md:gap-0 md:flex-col">
          <div className="flex">
            <Image
              className="w-auto h-auto object-contain"
              src="/images/bg1.jpg"
              alt="Workflow"
              width={200}
              height={200}
            />
          </div>
          <nav className="flex flex-col flex-1 mt-6">
            <div className="space-y-1">
              {links.map((link) =>
                link.name === "Stripe Dashboard" ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:text-orange hover:bg-Green"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link href={link.href} key={link.name}>
                    <a
                      className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-out ${
                        isActive(link.href) || isActive(link.href)
                          ? "bg-orange text-Green"
                          : "text-gray-600 hover:bg-Green hover:text-blue"
                      }`}
                    >
                      {link.name}
                    </a>
                  </Link>
                )
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
