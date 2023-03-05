import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../../utils/prisma"
// @ts-ignore
import Email from "../../../../utils/email"
const client = require("@sendgrid/client")
client.setApiKey(`${process.env.NEXT_PUBLIC_SENDGRID_API_KEY}`)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("signin required")
  }

  if (req.method === "GET") {
    return getHandler(req, res)
  } else if (req.method === "PUT") {
    return putHandler(req, res)
  } else if (req.method === "POST") {
    return postHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await db.user.findMany({
    where: {
      newsletter: true,
    },
  })
  res.send(users)
}

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body) {
    const request = {
      url: `/v3/marketing/contacts`,
      method: "PUT",
      body: req.body,
    }
    client
      .request(request)
      .then(([response, body]: any) => {
        console.log(response.statusCode)
        console.log(body)
      })
      .catch((error: any) => {
        console.log(error.response.statusCode)
      })
  }

  res.send({ message: "Newsletter updated successfully" })
}

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, subject, message, link, image } = req.body
  await new Email(user, subject, message, link, image).sendEmail()
  res.send({ message: "Email sent successfully" })
}

export default handler
