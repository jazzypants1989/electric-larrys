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

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)
export default Post
