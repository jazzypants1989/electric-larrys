import getAboutByID from "../../../../utils/dataHooks/getAboutByID"
import AboutEdit from "./AboutEdit"
import { notFound } from "next/navigation"

export default async function AboutEditPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  if (!id) {
    return notFound()
  }

  // this makes sure that it is a mongodb ID
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return notFound()
  }

  const about = await getAboutByID(id)

  if (!about) {
    return notFound()
  }

  return <AboutEdit about={about} />
}
