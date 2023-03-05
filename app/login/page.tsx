import Login from "./Login"

import { getProviders } from "next-auth/react"

import db from "../../utils/prisma"

// const createUser = async () => {
//   const user = await db.user.create({
//     data: {
//       email: "jessepence@gmail.com",
//       name: "Jesse Pence",
//       password: "Z0nkerswow!",
//       isAdmin: true,
//       isEmployee: true,
//       newsletter: true,
//     },
//   })
// }

export default async function Page() {
  const Providers = await getProviders()

  if (!Providers) {
    return <div>Hmmm, something went wrong. Please try again later.</div>
  }

  return <Login providers={Providers} />
}
