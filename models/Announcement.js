import mongoose from "mongoose"

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: false },
    description: { type: String, required: false },
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

const Announcement =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema)
export default Announcement
