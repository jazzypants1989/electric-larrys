import { getSession } from "next-auth/react"
import SliderPost from "../../../../models/SliderPost"
import Announcement from "../../../../models/Announcement"
import db from "../../../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("Error: signin required")
  }
  if (req.method === "GET") {
    await db.connect()
    const sliderPosts = await SliderPost.find({}).sort({ createdAt: -1 })
    const announcements = await Announcement.find({}).sort({ createdAt: -1 })
    await db.disconnect()
    res.send({ sliderPosts, announcements })
  } else if (req.method === "POST") {
    await db.connect()
    const sliderPost = new SliderPost({
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      link: req.body.link,
      isFeatured: req.body.isFeatured,
      isPublished: req.body.isPublished,
    })
    await sliderPost.save()
    await db.disconnect()
    res.send({ message: "Slider Post created successfully" })
  } else if (req.method === "PUT") {
    await db.connect()
    const sliderPost = await SliderPost.findById(req.query.id)
    if (sliderPost) {
      sliderPost.title = req.body.title
      sliderPost.image = req.body.image
      sliderPost.description = req.body.description
      sliderPost.link = req.body.link
      sliderPost.isFeatured = req.body.isFeatured
      sliderPost.isPublished = req.body.isPublished
      await sliderPost.save()
      await db.disconnect()
      res.send({ message: "Slider Post updated successfully" })
    } else {
      await db.disconnect()
      res.status(404).send({ message: "Slider Post not found" })
    }
  } else if (req.method === "DELETE") {
    await db.connect()
    const sliderPost = await SliderPost.findById(req.query.id)
    if (sliderPost) {
      await sliderPost.remove()
      await db.disconnect()
      res.send({ message: "Slider Post deleted successfully" })
    } else {
      await db.disconnect()
      res.status(404).send({ message: "Slider Post not found" })
    }
  }
}

export default handler
