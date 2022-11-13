import { getSession } from "next-auth/react"
import Product from "../../../models/Product"
import User from "../../../models/User"
import Announcement from "../../../models/Announcement"
import Note from "../../../models/Note"
import SliderPost from "../../../models/SliderPost"
import dbConnect from "../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("signin required")
  }

  await dbConnect()

  const productsCount = await Product.countDocuments()
  const usersCount = await User.countDocuments()
  const announcementsCount = await Announcement.countDocuments()
  const notesCount = await Note.countDocuments()
  const sliderPostsCount = await SliderPost.countDocuments()
  res.send({
    productsCount,
    usersCount,
    announcementsCount,
    notesCount,
    sliderPostsCount,
  })
}

export default handler
