import { getAllUsers } from "../../../utils/dataHooks/getAllUsers"
import { getCurrentUser } from "../../../utils/session"

import UsersPage from "./UsersPage"

export default async function AdminUsersPage() {
  const users = await getAllUsers()

  if (!users) {
    return (
      <h1 className="text-4xl font-bold drop-shadow">
        Something went wrong. Please try again.
      </h1>
    )
  }

  const user = await getCurrentUser()

  if (!user || !user.isAdmin) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="p-4 text-4xl font-bold drop-shadow">
          You are not authorized to view this page. Admins only.
        </h1>
      </div>
    )
  }

  return <UsersPage users={users} />
}
