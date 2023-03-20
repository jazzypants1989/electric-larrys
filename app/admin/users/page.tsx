import { getAllUsers } from "../../../utils/dataHooks/getAllUsers"
import UsersPage from "./UsersPage"
import { getCurrentUser } from "../../../utils/session"

export default async function AdminUsersPage() {
  const users = await getAllUsers()

  if (!users) {
    return <div>Failed to load</div>
  }

  const user = await getCurrentUser()

  if (!user || !user.isAdmin) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">
          You are not authorized to view this page. Admins only.
        </h1>
      </div>
    )
  }

  return <UsersPage users={users} />
}
