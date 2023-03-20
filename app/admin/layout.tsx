import { ReactNode, Suspense } from "react"
import AdminSideBar from "../../components/Admin/AdminSideBar"
import { getCurrentUser } from "../../utils/session"
import EmployeeProvider from "../../components/Auth/EmployeeProvider"
import Spinner from "../../components/Layout/Spinner"

export const metadata = {
  title: "Admin Page",
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <h1 className="my-20 text-center text-2xl">
        You are not logged in. This page is for employees only.
      </h1>
    )
  }

  if (!user.isEmployee) {
    return (
      <h1 className="my-20 text-center text-2xl">
        Are you an Electric Larry&apos;s employee? I didn&apos;t think so. Get
        outta here. <br /> Feel free to come in and apply if you live nearby!
      </h1>
    )
  }

  return (
    <EmployeeProvider>
      <Suspense fallback={<Spinner />}>
        <div className="flex flex-row">
          <AdminSideBar />
          {children}
        </div>
      </Suspense>
    </EmployeeProvider>
  )
}
