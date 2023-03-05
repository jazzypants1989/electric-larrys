import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../../../utils/prisma"

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
  const post = await db.post.findUnique({
    where: {
      id: req.query.id as string,
    },
  })
  res.send(post)
}

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const post = await db.post.update({
    where: {
      id: req.query.id as string,
    },
    data: {
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
      image: req.body.image,
      isFeatured: req.body.isFeatured,
      isPublished: req.body.isPublished,
    },
  })
  res.send(post)
}

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const post = await db.post.delete({
    where: {
      id: req.query.id as string,
    },
  })
  res.send(post)
}

export default handler
