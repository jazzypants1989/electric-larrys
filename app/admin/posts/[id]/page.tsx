import { getPostByID } from "../../../../utils/dataHooks/getPostByID"
import PostPage from "./Post"
import { notFound } from "next/navigation"

export default async function AdminPostPage({
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

  const post = await getPostByID(id)

  if (!post) {
    return notFound()
  }

  return <PostPage post={post} />
}
