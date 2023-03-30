import Link from "next/link"
import Card from "../../components/Layout/Card"
import { getCounts } from "../../utils/dataHooks/getCounts"
import { getNotes } from "../../utils/dataHooks/getNotes"
import Notes from "./notes"
import { getCurrentUser } from "../../utils/session"

export default async function AdminDashboardScreen() {
  const notes = await getNotes()
  const summary = await getCounts()
  const user = await getCurrentUser()
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="mb-4 text-xl text-orange drop-shadow">
          Admin Dashboard!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <Card className="m-2 p-2">
            <Link className="text-3xl" href="/admin/products">
              {summary.productsCount}{" "}
            </Link>
            <Link href="/admin/products">products</Link>
          </Card>
          <Card className="m-2 p-2">
            <Link className="text-3xl" href="/admin/users">
              {summary.usersCount}
            </Link>
            <Link href="/admin/users">users</Link>
          </Card>
          <Card className="m-2 p-2">
            <Link className="text-3xl" href="/admin/announcements">
              {summary.announcementsCount}{" "}
            </Link>
            <Link href="/admin/announcements">announcements</Link>
          </Card>
          <Card className="m-2 p-2">
            <p className="text-3xl">{summary.notesCount} </p>
            <p>Notes</p>
          </Card>
          <Card className="m-2 p-2">
            <Link className="text-3xl" href="/admin/posts">
              {summary.sliderPostsCount}{" "}
            </Link>
            <Link href="/admin/posts">posts</Link>
          </Card>
        </div>
        <div className="text-center">
          <Notes notes={notes} user={user} />
        </div>
      </div>
    </>
  )
}
