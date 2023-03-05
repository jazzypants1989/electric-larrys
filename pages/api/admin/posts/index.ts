import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../../utils/prisma"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("admin signin required")
  }
  // const { user } = session;
  if (req.method === "POST") {
    return postHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}
const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newSliderPost = await db.post.create({
    data: {
      title: "sample title",
      link: "https://www.google.com",
      image: "no",
      description: "sample description",
      isPublished: false,
      isFeatured: false,
    },
  })
  res.send(newSliderPost)
}

export default handler
