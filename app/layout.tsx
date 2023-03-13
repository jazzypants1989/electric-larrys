import React from "react"
import Footer from "../components/Layout/Footer/Footer"
import Header from "../components/Layout/Header/Header"
import ToastContainer from "../components/Layout/ToastContainer"
import "../styles/globals.css"
import siteConfig from "../utils/siteConfig"

import { Bangers } from "next/font/google"

const bangers = Bangers({
  weight: "400",
  preload: true,
  subsets: ["latin"],
})

export const metadata = {
  title: `${siteConfig.title}`,
  applicationName: `${siteConfig.title}`,
  description: `${siteConfig.description}`,
  keywords:
    "antiques, collectibles, oddities, Carbondale, Illinois, small business",
  authors: { name: "Jesse Pence", url: "https://jazzypants.dev" },
  themeColor: "#0050C0",
  creator: "Jesse Pence, Randall Majors, Meagan Majors",
  publisher: "Jesse Pence",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  manifest: `${process.env.NEXT_PUBLIC_BASE_URL}/site.webmanifest`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    title: `${siteConfig.title}`,
    description: `${siteConfig.description}`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: `${siteConfig.title}`,
    countryName: "United States",
    locale: `${siteConfig.siteLocale}`,
    images: [
      {
        url: `${siteConfig.siteImage}`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: "app",
    title: `${siteConfig.title}`,
    description: `${siteConfig.description}`,
    creator: "@jesse_pence5",
    app: {
      name: `${siteConfig.title}`,
      id: {
        iphone: "id123456789",
        ipad: "id123456789",
        googleplay: "com.example.app",
      },
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={bangers.className}>
      <head />
      <body className="m-0 max-w-full overflow-x-hidden scroll-smooth bg-blue p-0 font-thin tracking-wider text-Green">
        <Header />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  )
}
