"use client"

import { useSession } from "next-auth/react"
import { ReactNode } from "react"
import Spinner from "../../components/Layout/Spinner"

export default function EmployeeProvider({
  children,
}: {
  children: ReactNode
}) {
  const { data: session, status } = useSession()

  if (session?.user?.isEmployee && status === "authenticated") {
    return <>{children}</>
  } else if (status === "loading") {
    return (
      <div className="m-auto flex min-h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )
  } else {
    return (
      <h1 className="my-20 mx-auto text-center text-2xl">
        Are you an Electric Larry&apos;s employee? I didn&apos;t think so. Get
        outta here. Feel free to apply!
      </h1>
    )
  }
}
