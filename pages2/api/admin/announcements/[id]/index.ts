import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import Announcement from "../../../../../models/Announcement"
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
  const announcement = await Announcement.findById(req.query.id)
  await dbConnect()
  res.send(announcement)
}

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const announcement = await Announcement.findById(req.query.id)
  if (announcement) {
    announcement.title = req.body.title
    announcement.link = req.body.link
    announcement.description = req.body.description
    announcement.isPublished = req.body.isPublished
    announcement.date = new Date()
    await announcement.save()
    res.send({ message: "Announcement updated successfully" })
  } else {
    res.status(404).send({ message: "Announcement not found" })
  }
}
const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const announcement = await Announcement.findById(req.query.id)
  if (announcement) {
    await announcement.remove()
    res.send({ message: "Announcement deleted successfully" })
  } else {
    res.status(404).send({ message: "Announcement not found" })
  }
}
export default handler
