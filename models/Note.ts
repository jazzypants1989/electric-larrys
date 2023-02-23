import mongoose from "mongoose"

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    link: { type: String, required: false },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Note || mongoose.model<INote>("Note", noteSchema)

export interface INote extends mongoose.Document {
  title: string
  user: string
  link: string
  description: string
  image: string
  isPublished: boolean
}
