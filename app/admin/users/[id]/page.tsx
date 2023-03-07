import { getUserByID } from "../../../../utils/dataHooks/getUserByID"
import UserPage from "./UserPage"

export default async function AdminUserPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const user = await getUserByID(id)

  if (!user) {
    return <div>Either the user does not exist or the DB is down</div>
  }

  return <UserPage user={user} />
}
