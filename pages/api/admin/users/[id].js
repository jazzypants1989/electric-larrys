import User from "../../../../models/User"
import { getSession } from "next-auth/react"
import dbConnect from "../../../../utils/db"

const handler = async (req, res) => {
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

const getUser = async (req, res) => {
  await dbConnect()
  const user = await User.findById(req.query.id)
  res.send(user)
}

const updateUser = async (req, res) => {
  await dbConnect()
  const user = await User.findById(req.query.id)
  console.log(req.body)
  if (user) {
    user.name = req.body.name
    user.email = req.body.email
    user.isAdmin = req.body.isAdmin
    user.isEmployee = req.body.isEmployee
    user.newsletter = req.body.newsletter
    const updatedUser = await user.save()
    res.send(updatedUser)
  } else {
    res.status(404).send({ message: "User not found" })
  }
}

const deleteUser = async (req, res) => {
  await dbConnect()
  const user = await User.findById(req.query.id)
  if (user) {
    await user.remove()
    res.send({ message: "User deleted successfully" })
  } else {
    res.status(404).send({ message: "User not found" })
  }
}

export default handler
