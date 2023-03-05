import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import db from "../../../../utils/prisma"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("admin signin required")
  }

  switch (req.method) {
    case "GET":
      await getUser(req, res)
      break
    case "PUT":
      await updateUser(req, res)
      break
    case "DELETE":
      await deleteUser(req, res)
      break
    default:
      res.status(400).send({ message: "Method not allowed" })
      break
  }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await db.user.findUnique({
    where: {
      id: req.query.id as string,
    },
  })
  if (user) {
    res.send(user)
  } else {
    res.status(404).send({ message: "User not found" })
  }
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, isAdmin, isEmployee, newsletter } = req.body
  const user = await db.user.update({
    where: {
      id: req.query.id as string,
    },
    data: {
      name,
      email,
      isAdmin,
      isEmployee,
      newsletter,
    },
  })
  if (user) {
    res.send(user)
  } else {
    res.status(404).send({ message: "User not found" })
  }
}

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await db.user.delete({
    where: {
      id: req.query.id as string,
    },
  })
  if (user) {
    res.send(user)
  } else {
    res.status(404).send({ message: "User not found" })
  }
}

export default handler
