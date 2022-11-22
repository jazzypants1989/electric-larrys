import "../styles/globals.css"
import { SessionProvider, useSession } from "next-auth/react"
import { StoreProvider } from "../utils/Store"
import { useRouter } from "next/router"
import { Bangers } from "@next/font/google"

const bangers = Bangers({
  weight: "400",
  subset: "cursive",
})

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${bangers.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <StoreProvider>
          {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </StoreProvider>
      </SessionProvider>
    </>
  )
}

function Auth({ children, adminOnly }) {
  const router = useRouter()
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required")
    },
  })
  if (status === "loading") {
    return <div>Loading...</div>
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=admin login required")
  }

  return children
}

export default MyApp
