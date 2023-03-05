"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminSideBar() {
  const pathname = usePathname()
  const isActive = (r: string) => (r === pathname ? "active" : "")

  const links = [
    {
      name: "Dashboard",
      href: "/admin",
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
    <div className="flex max-h-screen w-fit flex-col border-orange drop-shadow md:pr-4 lg:border-r">
      <div className="flex flex-col md:p-2">
        <div className="flex gap-4 md:flex-col md:gap-0">
          <div className="flex">
            <Image
              className="h-auto w-auto object-contain"
              src="/images/bg1.jpg"
              alt="Workflow"
              width={200}
              height={200}
              priority
            />
          </div>
          <nav
            className="mt-6 flex flex-1 flex-col"
            aria-label="Administrative Sidebar"
          >
            <div className="space-y-1">
              {links.map((link) =>
                link.name === "Stripe Dashboard" ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white group flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-Green hover:text-orange"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    key={link.name}
                    className={`flex items-center rounded-md px-2 py-2 text-sm font-medium transition-all duration-300 ease-out ${
                      isActive(link.href) || isActive(link.href)
                        ? "bg-orange text-Green"
                        : "text-gray-600 hover:bg-Green hover:text-blue"
                    }`}
                  >
                    {link.name}
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
