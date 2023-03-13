export const revalidate = 0
import Success from "./Success"

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { session_id } = searchParams
  if (!session_id) {
    return <h1>Invalid session</h1>
  }
  const res = await fetch(`/api/success?session_id=${session_id}`)
  const data = await res.json()
  if (!data) {
    return <h1>Invalid session</h1>
  }

  return <Success order={data} />
}
