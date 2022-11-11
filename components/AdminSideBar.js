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
      name: "Orders",
      href: "/admin/orders",
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
  ]

  return (
    <div className="md:pr-4 flex flex-col w-fit max-h-screen lg:border-r border-orange">
      <div className="flex flex-col flex-1 md:p-6">
        <div className="flex md:flex-col flex-1">
          <div className="flex items-center flex-shrink-0">
            <Image
              className="w-auto h-8"
              src="/images/bg1.jpg"
              alt="Workflow"
              width={100}
              height={100}
            />
          </div>
          <nav className="flex flex-col flex-1 mt-6">
            <div className="space-y-1">
              {links.map((link) => (
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
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
