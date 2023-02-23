import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"
import Product from "../../../../models/Product"
import dbConnect from "../../../../utils/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("admin signin required")
  }
  // const { user } = session;
  if (req.method === "GET") {
    return getHandler(req, res)
  } else if (req.method === "POST") {
    return postHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}
const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const newProduct = new Product({
    name: "sample name",
    slug: "this-is-a-slug_good-for-seo" + Date.now(),
    image: "/images/bg1.jpg",
    price: 10,
    category: "one category here, 1-3 words, lowercase",
    tags: "as many tags as you want, 1-3 words, lowercase, split by commas",
    countInStock: 0,
    description: "More details about the product",
    isRented: false,
    isFeatured: false,
    isOnSale: false,
    salePrice: 5,
  })
  const product = await newProduct.save()
  res.send({ message: "Product created successfully", product })
}
const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const products = await Product.find({})
  res.send(products)
}
export default handler
