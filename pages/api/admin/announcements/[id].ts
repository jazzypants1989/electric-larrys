import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../../utils/prisma"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session || (session && !session.user.isEmployee)) {
    return res.status(401).send("signin required")
  }

  if (req.method === "PUT") {
    return putHandler(req, res)
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return res.status(400).send({ message: "Invalid announcement id" })
  }

  console.log(req.body)

  const id = req.query.id.toString()

  const announcement = await db.announcement.findUnique({
    where: {
      id: id,
    },
  })

  if (announcement) {
    await db.announcement.update({
      where: {
        id: id,
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        isPublished: req.body.isPublished,
      },
    })
    res.send({ message: "Announcement updated successfully" })
  } else {
    res.status(404).send({ message: "Announcement not found" })
  }
}

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return res.status(400).send({ message: "Invalid announcement id" })
  }

  const id = req.query.id.toString()

  const announcement = await db.announcement.findFirst({
    where: {
      id: id,
    },
  })

  if (announcement) {
    await db.announcement.delete({
      where: {
        id: id,
      },
    })
    res.send({ message: "Announcement deleted successfully" })
  } else {
    res.status(404).send({ message: "Announcement not found" })
  }
}
export default handler
