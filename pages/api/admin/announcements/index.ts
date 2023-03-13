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
  const newAnnouncement = db.announcement.create({
    data: {
      title: "50% off all products",
      link: "no",
      description:
        "Electric Larry has truly gone crazy this time. He's slashing prices like a madman. You can get a 50% discount on all of his products. But you better hurry, this sale won't last long.",
      isPublished: false,
    },
  })

  const announcement = await newAnnouncement

  res.send({ message: "Announcement created successfully", announcement })
}

export default handler
