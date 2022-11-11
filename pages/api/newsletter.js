let mongoose = require("mongoose")
let User = mongoose.model("User")

export default async function Newsletter(req, res) {
  if (req.method === "GET") {
    const users = await User.find({ newsletter: true }).select("-password")
    res.status(200).json(users)
  } else if (req.method === "POST") {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }
    const user = await User.findOne({ email })

    if (user.newsletter === true) {
      return res.status(400).json({ message: "You're already a member!!" })
    }

    if (user) {
      user.newsletter = true
      await user.save()
      return res.status(200).json({ message: "You're now a member!!" })
    }

    const newUser = new User({
      email,
      newsletter: true,
      password: "dummy",
      name: "dummy",
    })
    await newUser.save()
    res.status(200).json({ message: "Thank you for signing up!" })
  } else {
    res.status(400).json({ message: "Invalid request" })
  }
}
