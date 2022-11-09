import db from "../../utils/db"
import Product from "../../models/Product"

export default async function searchHandler(req, res) {
  await db.connect()
  let products = await Product.aggregate([
    {
      $search: {
        index: "default",
        text: {
          query: req.query.query,
          path: {
            wildcard: "*",
          },
          fuzzy: {
            maxEdits: 2,
            maxExpansions: 100,
          },
        },
      },
    },
    {
      $limit: 10,
    },
  ])

  // cycle through and take out the title, slug, and image

  for (let i = 0; i < products.length; i++) {
    products[i] = {
      name: products[i].name,
      slug: products[i].slug,
      image: products[i].image,
    }
  }

  await db.disconnect()
  res.send(products)
}
