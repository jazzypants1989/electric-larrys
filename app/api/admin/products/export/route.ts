import db from "../../../../../utils/prisma"
import { unparse } from "papaparse"

const newHeaders = {
  name: "Item Name",
  slug: "Reference Handle",
  countInStock: "Current Quantity Electric Larry's LLC",
  price: "Price",
  category: "Category",
} as Record<string, string>

export async function GET() {
  // get the current products from the database
  const current = await currentProducts()

  // transform the headers
  const transformed = current.map((product) =>
    convertPropertyNames(product, newHeaders)
  )

  // transform the tags from an array to a pipe separated string
  const transformedWithTags = transformed.map((product) => {
    const tags = product.tags || []
    return {
      ...product,
      tags: tags.join("|"),
    }
  })

  // convert the JSON to CSV
  const csv = unparse(transformedWithTags)

  // send the response as a file

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=products.csv",
    },
  })
}

function convertPropertyNames(
  obj: Record<string, any>,
  newHeaders: Record<string, string>
): Record<string, any> {
  const convertedObj = {} as Record<string, any>

  Object.keys(obj).forEach((key) => {
    const newKey = newHeaders[key] || key
    convertedObj[newKey] = obj[key]
  })

  return convertedObj
}

// 6.1. Loop through the headers and add the values to the values array

// function jsonToCsv(json: string) {
//   // 1. Parse the JSON string into an array of objects
//   const products = JSON.parse(json)

//   // 2. Define the headers
//   const headers = Object.keys(products[0])

//   // 3. Define the transformed headers
//   const transformedHeaders = {
//     name: "Item Name",
//     slug: "Reference Handle",
//     countInStock: "Current Quantity Electric Larry's LLC",
//     price: "Price",
//     category: "Category",
//   } as Record<string, string>

//   // 4. Create the result string
//   let result = ""

//   // 5. Add the headers to the result string
//   result +=
//     headers.map((header) => transformedHeaders[header] || header).join(",") +
//     "\n"

//   // 6. Loop through the products
//   for (let i = 0; i < products.length; i++) {
//     const product = products[i]
//     const values = []

//     // 6.1. Loop through the headers and add the values to the values array
//     for (let j = 0; j < headers.length; j++) {
//       const header = headers[j]
//       values.push(product[header])
//     }

//     // 6.2. Add values to the result string
//     result += values.join(",") + "\n"
//   }

//   // 7. Return the result string
//   return result
// }

async function currentProducts() {
  const products = await db.product.findMany()
  return products
}
