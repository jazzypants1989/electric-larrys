import User from "../../../../models/User"
import dbConnect from "../../../../utils/db"
import Email from "../../../../utils/email"
const client = require("@sendgrid/client")
client.setApiKey(`${process.env.NEXT_PUBLIC_SENDGRID_API_KEY}`)

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case "GET":
      try {
        const user = await User.$where("this.newsletter === true")
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case "POST":
      try {
        console.log(req.body)
        const { user, subject, message, link, image } = req.body
        // const user = await User.$where
        // // ("this.newsletter === true")
        await new Email(user, subject, message, link, image).sendEmail()
        res.status(201).json({ success: true, data: "Email sent" })
      } catch (error) {
        res.status(400).json({ success: false })
        console.log(error)
      }
      break
    case "PUT":
      if (req.body) {
        const request = {
          url: `/v3/marketing/contacts`,
          method: "PUT",
          body: req.body,
        }
        client
          .request(request)
          .then(([response, body]) => {
            console.log(response.statusCode)
            console.log(body)
          })
          .catch((error) => {
            console.log(error.response.statusCode)
          })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
