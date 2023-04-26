import React from "react"
import Script from "next/script"
import { Bangers } from "next/font/google"

import Footer from "../components/Layout/Footer/Footer"
import Header from "../components/Layout/Header/Header"
import ToastContainer from "../components/Layout/ToastContainer"
import "../styles/globals.css"
import siteConfig from "../utils/siteConfig"

import AuthProvider from "../components/Auth/AuthProvider"
import { getCurrentUser } from "@/utils/session"

const bangers = Bangers({
  weight: "400",
  preload: true,
  subsets: ["latin"],
})

export const metadata = {
  title: {
    default: `${siteConfig.title}`,
    template: `%s at ${siteConfig.title}`,
  },
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
  manifest: `${siteConfig.siteUrl}/site.webmanifest`,
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
    url: `${siteConfig.siteUrl}`,
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <html lang="en" className={bangers.className}>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W5ZG3BB')
        `}
        </Script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="relative z-50 m-0 max-w-full overflow-x-hidden scroll-smooth bg-blue p-0 font-thin tracking-wider text-Green">
        <AuthProvider>
          <Header user={user} />
          {children}
        </AuthProvider>
        <Footer />
        <ToastContainer />
        <div
          dangerouslySetInnerHTML={{
            __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W5ZG3BB"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
          }}
        />
      </body>
    </html>
  )
}
