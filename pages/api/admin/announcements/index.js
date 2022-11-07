import { getSession } from "next-auth/react"
import Announcement from "../../../../models/Announcement"
import db from "../../../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("Error: signin required")
  }
  if (req.method === "GET") {
    await db.connect()
    const announcements = await Announcement.find({}).sort({ createdAt: -1 })
    await db.disconnect()
    res.send(announcements)
  } else if (req.method === "POST") {
    await db.connect()
    const announcement = new Announcement({
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
      isPublished: req.body.isPublished,
    })
    await announcement.save()
    await db.disconnect()
    res.send({ message: "Announcement created successfully" })
  } else if (req.method === "PUT") {
    await db.connect()
    const announcement = await Announcement.findById(req.query.id)
    if (announcement) {
      announcement.title = req.body.title
      announcement.description = req.body.description
      announcement.isPublished = req.body.isPublished
      announcement.link = req.body.link
      await announcement.save()
      await db.disconnect()
      res.send({ message: "Announcement updated successfully" })
    } else {
      await db.disconnect()
      res.status(404).send({ message: "Announcement not found" })
    }
  } else if (req.method === "DELETE") {
    await db.connect()
    const announcement = await Announcement.findById(req.query.id)
    if (announcement) {
      await announcement.remove()
      await db.disconnect()
      res.send({ message: "Announcement deleted successfully" })
    } else {
      await db.disconnect()
      res.status(404).send({ message: "Announcement not found" })
    }
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}

export default handler
