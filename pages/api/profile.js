let mongoose = require("mongoose")
let User = mongoose.model("User")

export default async function Newsletter(req, res) {
  if (req.method === "GET") {
    const users = await User.find({ newsletter: true })
    res.send(users)
  } else if (req.method === "PUT") {
    const { email, newsletter } = req.body
    console.log(email, newsletter)

    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        { newsletter: newsletter },
        { new: true }
      )
      res.status(200).json(user)
      console.log(user)
    } catch (error) {
      res.status(400).json({ success: false })
    }
  }
}
