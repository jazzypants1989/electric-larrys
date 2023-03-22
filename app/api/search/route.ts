import db from "../../../utils/prisma"
import { NextRequest, NextResponse } from "next/server"

// Create a function to get the trigrams of a string
function getTrigrams(str: string): string[] {
  const trigrams: string[] = []

  const paddedStr = ` ${str} ` // This is to avoid out of bounds errors

  // Loop through the string and get the trigrams
  for (let i = 0; i < paddedStr.length - 2; i++) {
    const trigram = paddedStr.substring(i, i + 3)
    trigrams.push(trigram)
  }

  return trigrams
}

function trigramMatching(str1: string, str2: string): number {
  // Split the strings into trigrams
  const tri1 = getTrigrams(str1)
  const tri2 = getTrigrams(str2)

  // Compute the number of matching trigrams between the two strings
  const matchingTri = tri1.filter((tri) => tri2.includes(tri))
  // Divide the number of matching trigrams by the number of trigrams in the second string
  const similarity = matchingTri.length / tri2.length

  // Return the similarity
  return similarity
}

async function fuzzySearch(search: string) {
  // Get all the products from the database
  const products = await db.product.findMany()
  // Create an array to store the results
  const results = []

  // Loop through all the products
  for (const product of products) {
    // Get the product name, description, category and tags
    const productName = product.name.toLowerCase()
    const description = product.description
      ? product.description.toLowerCase()
      : ""
    const category = product.category ? product.category.toLowerCase() : ""
    const tags = product.tags ? product.tags.join(" ").toLowerCase() : ""
    const searchQuery = search.toLowerCase()

    // Compute the similarity between the search query and the product name, description, category and tags
    const productNameSimilarity = trigramMatching(productName, searchQuery)
    const descriptionSimilarity = trigramMatching(description, searchQuery)
    const categorySimilarity = trigramMatching(category, searchQuery)
    const tagsSimilarity = trigramMatching(tags, searchQuery)

    // Find which similarity is the highest
    const similarity = Math.max(
      productNameSimilarity,
      descriptionSimilarity,
      categorySimilarity,
      tagsSimilarity
    )

    // If the similarity is greater than 0, Add the product to the results
    if (
      productName.includes(searchQuery) ||
      description.includes(searchQuery) ||
      category.includes(searchQuery) ||
      tags.includes(searchQuery) ||
      similarity > 0
    ) {
      results.push({ product, similarity })
    }
  }

  // Filter out the products with a similarity less than 0.4
  const filteredResults = results.filter((result) => result.similarity >= 0.4)

  // Sort the products by the similarity
  filteredResults.sort((a, b) => b.similarity - a.similarity)

  // Return the products
  return filteredResults.map((result) => result.product)
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const search = url.searchParams.get("search")

  if (!search) {
    return NextResponse.json(
      { message: "No search query provided" },
      {
        status: 400,
      }
    )
  }

  const results = await fuzzySearch(search)

  return NextResponse.json(results)
}
