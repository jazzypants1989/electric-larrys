import { getAllPosts } from "../../../utils/dataHooks/getAllPosts"
import Posts from "./Posts"
import { notFound } from "next/navigation"

export default async function AdminPostsPage() {
  const posts = await getAllPosts()

  if (!posts) {
    return notFound()
  }

  return <Posts posts={posts} />
}
