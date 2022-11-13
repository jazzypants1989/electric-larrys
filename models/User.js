import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isEmployee: { type: Boolean, required: true, default: false },
    newsletter: { type: Boolean, required: true, default: false },
    image: { type: String, required: true, default: "/images/wow.webp" },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.User || mongoose.model("User", userSchema)
