import Login from "./Login"

import { getProviders } from "next-auth/react"

export default async function Page() {
  const Providers = await getProviders()

  if (!Providers) {
    return <div>Hmmm, something went wrong. Please try again later.</div>
  }

  return <Login providers={Providers} />
}
