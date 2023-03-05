import db from "../../utils/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search } = req.query

  const parsedSearch = search?.toString().toLowerCase()

  const results = await db.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: parsedSearch,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: parsedSearch,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: parsedSearch,
            mode: "insensitive",
          },
        },
        {
          tags: {
            hasSome: parsedSearch,
          },
        },
      ],
    },
  })

  res.status(200).json(results)
}
