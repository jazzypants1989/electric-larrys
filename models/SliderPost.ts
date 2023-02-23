import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: false },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", postSchema)

export default Post

export interface IPost extends mongoose.Document {
  title: string
  link: string
  description: string
  image: string
  isFeatured: boolean
  isPublished: boolean
}
