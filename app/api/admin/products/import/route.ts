import db from "../../../../../utils/prisma"
import { NextRequest } from "next/server"
import { parse } from "papaparse"
// import { parse } from "papaparse"

export async function POST(req: NextRequest) {
  const csvArray = await req.arrayBuffer()
  const csv = new TextDecoder("utf-8").decode(csvArray)

  // console.log("POST", csv)

  try {
    // // Convert CSV to JSON
    const json = parse(csv, { header: true })
    const products = json.data
    // const json = csvToJson(csv)
    // if (!json) return
    // const products = JSON.parse(json)
    // // Get all products in the database
    const current = await currentProducts()
    // Filter out products that already exist
    // @ts-ignore
    const newProducts = products.filter((product: DBProduct) => {
      // Generate a potential slug for the product
      const slug = createSlug(product)

      // Check if the slug already exists in the database
      return !current.some((DBproduct) => DBproduct.slug === slug)
    })

    // Create the new products
    // @ts-ignore
    await createProducts(newProducts)

    if (newProducts.length > 0) {
      return new Response(JSON.stringify("Products imported successfully"), {
        status: 200,
      })
    } else {
      return new Response(JSON.stringify("No new products to import"), {
        status: 200,
      })
    }
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify("Error importing products"), {
      status: 500,
    })
  }
}

export async function PUT(req: NextRequest) {
  // get the csv from the request body
  const csvArray = await req.arrayBuffer()
  const csv = new TextDecoder("utf-8").decode(csvArray)

  try {
    // const json = csvToJson(csv)
    // console.log("JSON:", json)
    const json = parse(csv, { header: true })
    // parse the json to an array of products
    if (!json) return
    const products = json.data
    console.log("Products from CSV:", products)
    // get the current products from the database
    const current = await currentProducts()

    console.log("Current products:", current)

    // find products that have a matching slug
    // @ts-ignore
    const updatedProducts = products.filter((product: DBProduct) => {
      // get the slug of the product
      const slug = createSlug(product)

      // return true if the slug is in the current products array
      return current.some((DBproduct) => DBproduct.slug === slug)
    })

    // update the found products
    // @ts-ignore
    await updateProducts(updatedProducts)

    // return a response with the number of products updated
    if (updatedProducts.length > 0) {
      return new Response(
        JSON.stringify(`${updatedProducts.length} products updated`),
        {
          status: 200,
        }
      )
    } else {
      return new Response(JSON.stringify("No products to update"), {
        status: 200,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

// function csvToJson(csv: string) {
//   // 1. Split the csv string into an array of lines
//   const lines = csv.split("\n")

//   const sanitizedLines = lines.map((line) => sanitizeRow(line))

//   if (!sanitizedLines[0]) return

//   // 2. Split the first line into an array of headers
//   const headers = sanitizedLines[0].split(",")

//   // 3. Create the result array
//   const result = []

//   // 4. Loop through the rest of the lines
//   for (let i = 1; i < lines.length; i++) {
//     // 4.1. Create an object for this line
//     const obj = {}

//     // 4.2. Split the line into an array of values
//     const currentLine = lines[i].split(",")

//     // 4.3. Loop through the headers and use them as keys for the object
//     for (let j = 0; j < headers.length; j++) {
//       // @ts-ignore
//       obj[headers[j]] = currentLine[j]
//     }

//     // 4.4. Push the object to the result array
//     result.push(obj)
//   }

//   // 5. Return the result as a JSON string
//   return JSON.stringify(result)
// }

// // this function removes all carriage or line returns from a string
// function sanitizeRow(row: string) {
//   if (!row) return
//   return row.replace(/(\r\n|\n|\r)/gm, "")
// }

function createSlug(product: DBProduct) {
  if (!product["Item Name"]) return
  if (!product["Reference Handle"]) return
  // Get the slug from the Reference Handle
  const slug =
    product["Reference Handle"].charAt(0) === "#" // check if the first character is a hash
      ? product["Reference Handle"].substring(1) // remove the hash at the beginning of the slug if it exists
      : product["Reference Handle"] // otherwise, use the slug as-is

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
  if (!product["Item Name"]) return
  return {
    name: product["Item Name"],
    slug: createSlug(product),
    image:
      product["image"] ||
      "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403244/toys",
    price: Number(product["Price"]),
    category: product["Category"],
    tags: product["futuretags"] || product["tags"],
    countInStock: Number(product["Current Quantity Electric Larry's LLC"]),
    description:
      product["description"] || "This is a product! You want to buy it!",
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
    if (!products[i]["Item Name"]) continue
    if (
      !products[i]["Reference Handle"] ||
      products[i]["Reference Handle"] === " "
    )
      continue
    if (!products[i]["Price"] || isNaN(Number(products[i]["Price"]))) continue

    const product = await db.product.create({
      // @ts-ignore
      data: transformProduct(products[i]),
    })

    console.log(product)
  }
}

async function updateProducts(products: DBProduct[]) {
  for (let i = 0; i < products.length; i++) {
    if (!products[i]["Item Name"]) continue
    if (
      !products[i]["Reference Handle"] ||
      products[i]["Reference Handle"] === " "
    )
      continue
    if (!products[i]["Price"] || isNaN(Number(products[i]["Price"]))) continue

    const product = await db.product.update({
      where: { slug: createSlug(products[i]) },
      // @ts-ignore
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
  "tags": string
  "image": string
  "Current Quantity Electric Larry's LLC": string
  "description": string
  "Featured": string
  "On Sale": string
  "Sale Price": string
  "futuretags": string
}
