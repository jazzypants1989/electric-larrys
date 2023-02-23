import Product from "../../models/Product"
import dbConnect from "../../utils/db"

export default async function searchHandler(req, res) {
  dbConnect()

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
      price: products[i].price,
    }
  }

  res.send(products)
}
