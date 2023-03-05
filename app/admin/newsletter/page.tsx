import { getNewsletterUsers } from "../../../utils/dataHooks/getNewsletterUsers"
import Newsletter from "./Newsletter"
import { notFound } from "next/navigation"

export default async function AdminNewsletter() {
  const users = await getNewsletterUsers()

  if (!users) {
    return notFound()
  }

  return <Newsletter users={users} />
}
