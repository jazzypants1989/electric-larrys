export const revalidate = 0
import Success from "./Success"

// export default async function Page({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined }
// }) {
//   const { session_id } = searchParams
//   console.log(session_id)
//   if (!session_id) {
//     return <h1>Invalid session</h1>
//   }
//   const res = await fetch(`/api/success?session_id=${session_id}`)
//   const data = await res.json()
//   if (!data) {
//     return <h1>Invalid session</h1>
//   }
// error - TypeError: Failed to parse URL from /api/success?session_id=cs_test_b1TH1lq04tok1KSpgQtSKCFqgUlzby8SqHnJPZ4dav5AgUKH4rhvaE36NU

export default function Page() {
  return <Success />
}
