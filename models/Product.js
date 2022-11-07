import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    tags: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    isOnSale: { type: Boolean, default: false },
    isRented: { type: Boolean, default: false },
    salePrice: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema)
export default Product
