import { getAnnouncementByID } from "../../../../utils/dataHooks/getAnnouncementByID"
import AnnouncementPage from "./Announcement"
import { notFound } from "next/navigation"
import type { Announcement } from "@prisma/client"

export default async function AdminAnnouncementPage({
  params,
}: {
  // params: { id: string }
}) {
  const { id } = params

  if (!id) {
    return notFound()
  }

  // this makes sure that it is a mongodb ID
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return notFound()
  }

  const announcement = await getAnnouncementByID(id)

  if (!announcement) {
    return notFound()
  }

  return <AnnouncementPage announcement={announcement} />
}
