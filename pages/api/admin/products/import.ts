import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../../utils/prisma"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("admin signin required")
  }

  if (req.method === "POST") {
    return postHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const csv = req.body
  const json = csvToJson(csv)
  const products = JSON.parse(json)

  for (let i = 0; i < products.length; i++) {
    const product = await db.product.create({
      data: transformProduct(products[i]),
    })

    console.log(product)
  }

  res.send({ message: "Products created successfully" })
}

function csvToJson(csv: string) {
  const lines = csv.split("\n")
  const headers = lines[0].split(",")
  const result = []

  for (let i = 1; i < lines.length; i++) {
    const obj = {}
    const currentLine = lines[i].split(",")

    for (let j = 0; j < headers.length; j++) {
      // @ts-ignore
      obj[headers[j]] = currentLine[j]
    }

    result.push(obj)
  }

  return JSON.stringify(result)
}

const potentialSlug = (product: DBProduct) => {
  console.log(product["Reference Handle"])
  const slug = product["Reference Handle"].substring(1)

  if (slug.charAt(slug.length - 1) === "-") {
    return slug.slice(0, -1)
  } else if (slug === "" || slug === " " || slug === "  ") {
    return product["Item Name"].toLowerCase().replace(/ /g, "-")
  } else if (slug.startsWith(" ") || slug.startsWith("-")) {
    return slug.substring(1)
  } else {
    return slug
  }
}

function transformProduct(product: DBProduct) {
  return {
    name: product["Item Name"],
    slug: potentialSlug(product),
    image: "https://electric-larrys.vercel.app/images/bg1.jpg",
    price: Number(product["Price"]),
    category: product["Category"],
    tags: ["oddities"],
    countInStock: Number(product["Current Quantity Electric Larry's LLC"]),
    description: "This is a product! You want to buy it!",
    isFeatured: false,
    isOnSale: false,
    salePrice: 10,
  }
}

export default handler

type DBProduct = {
  "Item Name": string
  "Reference Handle": string
  "Price": string
  "Category": string
  "Tags": string
  "Current Quantity Electric Larry's LLC": string
  "Description": string
  "Featured": string
  "On Sale": string
  "Sale Price": string
}
