import { getCurrentUser } from "../../../../utils/session"
import { NextResponse } from "next/server"
import db from "../../../../utils/prisma"

export async function POST() {
  const user = await getCurrentUser()
  if (!user || (user && !user.isEmployee)) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action" },
      { status: 401 }
    )
  }

  const newAnnouncement = await db.announcement.create({
    data: {
      title: "50% off all products",
      link: "https://www.electric-larrys.vercel.app",
      description:
        "Electric Larry has truly gone crazy this time. He's slashing prices like a madman. You can get a 50% discount on all of his products. But you better hurry, this sale won't last long.",
      isPublished: false,
    },
  })

  return NextResponse.json({
    message: "Announcement created successfully",
    announcement: newAnnouncement,
  })
}
