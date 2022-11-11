import { getSession } from "next-auth/react"
import Announcement from "../../../../models/Announcement"
import dbConnect from "../../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("admin signin required")
  }
  // const { user } = session;
  if (req.method === "GET") {
    return getHandler(req, res)
  } else if (req.method === "POST") {
    return postHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}
const postHandler = async (req, res) => {
  await dbConnect()
  const newAnnouncement = new Announcement({
    title: "50% off all products",
    link: "no",
    description:
      "Electric Larry has truly gone crazy this time. He's slashing prices like a madman. You can get a 50% discount on all of his products. But you better hurry, this sale won't last long.",
    isPublished: false,
  })
  const announcement = await newAnnouncement.save()
  res.send({ message: "Announcement created successfully", announcement })
}
const getHandler = async (req, res) => {
  dbConnect()
  const announcements = await Announcement.find({})
  res.send(announcements)
}

export default handler
