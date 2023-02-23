import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import SliderPost from "../../../../models/SliderPost"
import dbConnect from "../../../../utils/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const newSliderPost = new SliderPost({
    title: "sample title",
    link: "https://www.google.com",
    image: "no",
    description:
      "number of times Jesse has regretted making this the primary key: " +
      Math.floor(Math.random() * 1000000 + 1).toString(),
    isPublished: false,
    isFeatured: false,
  })
  const sliderPost = await newSliderPost.save()
  res.send({ message: "Slider Post created successfully", sliderPost })
}
const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const sliderPosts = await SliderPost.find({})
  res.send(sliderPosts)
}

export default handler
