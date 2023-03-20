import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../../utils/prisma"
import { Product } from "../../../../utils/dataHooks/getProducts"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session || !session.user.isEmployee) {
    return res.status(401).send("admin signin required")
  }

  if (req.method === "POST") {
    return postHandler(req, res)
  } else if (req.method === "PUT") {
    return putHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const csv = req.body
  const json = csvToJson(csv)
  const products = JSON.parse(json)
  const current = await currentProducts()

  const newProducts = products.filter((product: DBProduct) => {
    const slug = potentialSlug(product)

    return !current.some((p: Product) => p.slug === slug)
  })

  await createProducts(newProducts)

  res.send({ message: "Products created successfully" })
}

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const csv = req.body
  const json = csvToJson(csv)
  const products = JSON.parse(json)
  const current = await currentProducts()

  const updatedProducts = products.filter((product: DBProduct) => {
    const slug = potentialSlug(product)

    return current.some((p: Product) => p.slug === slug)
  })

  await updateProducts(updatedProducts)

  res.send({ message: "Products updated successfully" })
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

function potentialSlug(product: DBProduct) {
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
    image:
      "https://res.cloudinary.com/jovial-penguin/image/upload/c_thumb,w_400,g_face/v1678403244/319886454_675169010823442_2415112957092316693_n_wurxol.jpg",
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

async function currentProducts() {
  const products = await db.product.findMany()
  return products
}

async function createProducts(products: DBProduct[]) {
  for (let i = 0; i < products.length; i++) {
    const product = await db.product.create({
      data: transformProduct(products[i]),
    })

    console.log(product)
  }
}

async function updateProducts(products: DBProduct[]) {
  for (let i = 0; i < products.length; i++) {
    const product = await db.product.update({
      where: { slug: potentialSlug(products[i]) },
      data: transformProduct(products[i]),
    })

    console.log(product)
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
