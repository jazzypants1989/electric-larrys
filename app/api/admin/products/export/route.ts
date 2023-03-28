import db from "../../../../../utils/prisma"

export async function GET() {
  // get the current products from the database
  const current = await currentProducts()

  // convert the products to csv
  const csv = jsonToCsv(JSON.stringify(current))

  // send the response as a file

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=products.csv",
    },
  })
}

function jsonToCsv(json: string) {
  // 1. Parse the JSON string into an array of objects
  const products = JSON.parse(json)

  // 2. Define the headers
  const headers = Object.keys(products[0])

  // 3. Define the transformed headers
  const transformedHeaders = {
    name: "Item Name",
    slug: "Reference Handle",
    countInStock: "Current Quantity Electric Larry's LLC",
    price: "Price",
    category: "Category",
  } as Record<string, string>

  // 4. Create the result string
  let result = ""

  // 5. Add the headers to the result string
  result +=
    headers.map((header) => transformedHeaders[header] || header).join(",") +
    "\n"

  // 6. Loop through the products
  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    const values = []

    // 6.1. Loop through the headers and add the values to the values array
    for (let j = 0; j < headers.length; j++) {
      const header = headers[j]
      values.push(product[header])
    }

    // 6.2. Add values to the result string
    result += values.join(",") + "\n"
  }

  // 7. Return the result string
  return result
}

async function currentProducts() {
  const products = await db.product.findMany()
  return products
}
