import { getAllUsers } from "../../../utils/dataHooks/getAllUsers"
import UsersPage from "./UsersPage"

export default async function AdminUsersPage() {
  const users = await getAllUsers()

  if (!users) {
    return <div>Failed to load</div>
  }

  return <UsersPage users={users} />
}
