import db from "../../../../../utils/prisma"
import { Product } from "../../../../../utils/dataHooks/getProducts"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const csv = await req.json()
  // Convert CSV to JSON
  const json = csvToJson(csv)
  // Parse JSON into an object
  const products = JSON.parse(json)
  // Get all products in the database
  const current = await currentProducts()

  // Filter out products that already exist
  const newProducts = products.filter((product: DBProduct) => {
    // Generate a potential slug for the product
    const slug = potentialSlug(product)

    // Check if the slug already exists in the database
    return !current.some((p: Product) => p.slug === slug)
  })

  // Create the new products
  await createProducts(newProducts)

  // Send a response
  NextResponse.json({ message: "Products imported successfully" })
}

export async function PUT(req: NextRequest) {
  // get the csv from the request body
  const csv = await req.json()
  // convert the csv to json
  const json = csvToJson(csv)
  // parse the json to an array of products
  const products = JSON.parse(json)
  // get the current products from the database
  const current = await currentProducts()

  // find products that have a matching slug
  const updatedProducts = products.filter((product: DBProduct) => {
    // get the slug of the product
    const slug = potentialSlug(product)

    // return true if the slug is in the current products array
    return current.some((p: Product) => p.slug === slug)
  })

  // update the found products
  await updateProducts(updatedProducts)

  // send a response
  NextResponse.json({ message: "Products updated successfully" })
}

function csvToJson(csv: string) {
  // 1. Split the csv string into an array of lines
  const lines = csv.split("\n")

  // 2. Split the first line into an array of headers
  const headers = lines[0].split(",")

  // 3. Create the result array
  const result = []

  // 4. Loop through the rest of the lines
  for (let i = 1; i < lines.length; i++) {
    // 4.1. Create an object for this line
    const obj = {}

    // 4.2. Split the line into an array of values
    const currentLine = lines[i].split(",")

    // 4.3. Loop through the headers and use them as keys for the object
    for (let j = 0; j < headers.length; j++) {
      // @ts-ignore
      obj[headers[j]] = currentLine[j]
    }

    // 4.4. Push the object to the result array
    result.push(obj)
  }

  // 5. Return the result as a JSON string
  return JSON.stringify(result)
}

function potentialSlug(product: DBProduct) {
  // Get the slug from the Reference Handle
  const slug = product["Reference Handle"].substring(1) // remove the hash at the beginning

  // If the slug ends with a dash, remove it
  if (slug.charAt(slug.length - 1) === "-") {
    return slug.slice(0, -1)
    // If the slug is empty or only contains a space, use the product name instead
  } else if (slug === "" || slug === " " || slug === "  ") {
    return product["Item Name"].toLowerCase().replace(/ /g, "-") // replace spaces with dashes
    // If the slug starts with a space or dash, remove it
  } else if (slug.startsWith(" ") || slug.startsWith("-")) {
    return slug.substring(1)
    // Otherwise, return the slug as-is
  } else {
    return slug
  }
}

// This function takes a product from the database and transforms it into a product that can be used in the frontend
// Note: The image, description, isFeatured, isOnSale, and salePrice properties are hardcoded because they are not included in the csv
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
