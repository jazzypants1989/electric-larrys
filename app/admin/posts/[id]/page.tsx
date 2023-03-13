import { getPostByID } from "../../../../utils/dataHooks/getPostByID"
import { getAllPictures } from "../../../../utils/dataHooks/getAllPictures"
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

  const data = await getAllPictures()

  const pictures = data
    .filter((post) => post.image !== "")
    .map((post) => post.image)

  // @ts-ignore
  return <PostPage post={post} pictures={pictures} />
}
