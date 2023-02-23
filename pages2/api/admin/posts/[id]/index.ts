import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import Post from "../../../../../models/SliderPost"
import dbConnect from "../../../../../utils/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("signin required")
  }

  if (req.method === "GET") {
    return getHandler(req, res)
  } else if (req.method === "PUT") {
    return putHandler(req, res)
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const post = await Post.findById(req.query.id)
  res.send(post)
}
const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const post = await Post.findById(req.query.id)
  if (post) {
    post.title = req.body.title
    post.link = req.body.link
    post.description = req.body.description
    post.image = req.body.image
    post.isFeatured = req.body.isFeatured
    post.isPublished = req.body.isPublished
    post.date = new Date()
    await post.save()
    res.send({ message: "Post updated successfully" })
  } else {
    res.status(404).send({ message: "Post not found" })
  }
}
const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const post = await Post.findById(req.query.id)
  if (post) {
    await post.remove()
    res.send({ message: "Post deleted successfully" })
  } else {
    res.status(404).send({ message: "Post not found" })
  }
}
export default handler
