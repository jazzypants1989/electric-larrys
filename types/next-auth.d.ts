/* eslint-disable */

import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      isAdmin?: boolean
      isEmployee?: boolean
      newsletter?: boolean
      email?: string
      _id?: string
    } & DefaultSession["user"]
  }

  interface User {
    isAdmin?: boolean
    isEmployee?: boolean
    newsletter?: boolean
    email?: string
    _id?: string
    name?: string
    image?: string
  }
}
