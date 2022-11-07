import { getSession } from "next-auth/react"
import SliderPost from "../../../../models/SliderPost"
import db from "../../../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("Error: signin required")
  }
  if (req.method === "GET") {
    await db.connect()
    const sliderPosts = await SliderPost.findById(req.query.id)
    await db.disconnect()
    res.send(sliderPosts)
  } else if (req.method === "POST") {
    await db.connect()
    const sliderPost = new SliderPost({
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      isPublished: req.body.isPublished,
      isFeatured: req.body.isFeatured,
      image: req.body.image,
    })
    await sliderPost.save()
    await db.disconnect()
    res.send({ message: "Slider Post created successfully" })
  } else if (req.method === "PUT") {
    await db.connect()
    const sliderPost = await SliderPost.findById(req.query.id)
    if (sliderPost) {
      sliderPost.title = req.body.title
      sliderPost.description = req.body.description
      sliderPost.link = req.body.link
      sliderPost.isPublished = req.body.isPublished
      sliderPost.isFeatured = req.body.isFeatured
      sliderPost.image = req.body.image
      await sliderPost.save()
      await db.disconnect()
      res.send({ message: "Slider Post updated successfully" })
    }
  } else if (req.method === "DELETE") {
    await db.connect()
    const sliderPost = await SliderPost.findById(req.query.id)
    if (sliderPost) {
      await sliderPost.remove()
      await db.disconnect()
      res.send({ message: "Slider Post deleted successfully" })
    }
  }
}

export default handler
