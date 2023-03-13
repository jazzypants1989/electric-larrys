import { v2 as cloudinary } from "cloudinary"
import { NextApiRequest, NextApiResponse } from "next"

export default function signature(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.CLOUDINARY_SECRET) {
    throw new Error("Missing the CLOUDINARY_SECRET environment variable.")
  }
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET
  )

  console.log("signature", signature)
  console.log("timestamp", timestamp)

  res.statusCode = 200
  res.json({
    signature,
    timestamp,
  })
}
