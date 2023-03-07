import { getAllAnnouncements } from "../../../utils/dataHooks/getAllAnnouncements"
import Announcements from "./Announcements"
import { notFound } from "next/navigation"

export default async function AdminAnnouncementsPage() {
  const announcements = await getAllAnnouncements()

  if (!announcements) {
    return notFound()
  }

  return <Announcements announcements={announcements} />
}
