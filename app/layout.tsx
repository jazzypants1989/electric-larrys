import React from "react"
import Footer from "../components/Layout/Footer/Footer"
import Header from "../components/Layout/Header/Header"
import ToastContainer from "../components/Layout/ToastContainer"
import "../styles/globals.css"

import { Bangers } from "next/font/google"

const bangers = Bangers({
  weight: "400",
  preload: true,
  subsets: ["latin"],
})

export const metadata = {
  title: "Electric Larry's",
  applicationName: "Electric Larry's",
  description:
    "Electric Larry's is a small business in Carbondale, Illinois. We sell a variety of oddities, antiques, and collectibles.",
  keywords:
    "antiques, collectibles, oddities, Carbondale, Illinois, small business",
  authors: { name: "Jesse Pence", url: "https://jazzypants.dev" },
  themeColor: "#0050C0",
  creator: "Jesse Pence, Randall Majors, Meagan Majors",
  publisher: "Jesse Pence",
  generator: "electriclarrys.vercel.app",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
      <body className="m-0 max-w-full overflow-x-hidden scroll-smooth bg-blue p-0 font-thin tracking-wider text-Green">
        <Header />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  )
}
