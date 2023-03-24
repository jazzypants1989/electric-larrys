import { getCurrentUser } from "../../../utils/session"
import getAllAbouts from "../../../utils/dataHooks/getAllAbouts"
import AdminAbout from "./AdminAbout"

export default async function AdminAboutPage() {
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

  const abouts = await getAllAbouts()

  return <AdminAbout abouts={abouts} />
}
