import db from "../../../../utils/prisma"

export async function DELETE() {
  const products = await db.product.deleteMany()

  return new Response(JSON.stringify(products), {
    status: 200,
  })
}
