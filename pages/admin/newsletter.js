// import { useRouter } from "next/router"
// import { toast } from "react-toastify"
import AdminSideBar from "../../components/AdminSideBar"
import Layout from "../../components/Layout"

export default function AdminNews() {
  return (
    <Layout title="Announcements">
      <div className="grid justify-center items-center text-center md:grid-cols-4 md:gap-4 sm:grid-cols-1 sm:gap-4">
        <AdminSideBar />
        <h1 className="text-2xl font-semibold text-center md:col-span-3 sm:col-span-1">
          Coming Soon!
        </h1>
      </div>
    </Layout>
  )
}

AdminNews.auth = { adminOnly: true }
