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
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema)

export default Product

export interface IProduct extends mongoose.Document {
  name: string
  slug: string
  category: string
  image: string
  price: number
  countInStock: number
  description: string
  tags: string
  isFeatured: boolean
  isOnSale: boolean
  isRented: boolean
  salePrice: number
  createdAt: Date
  updatedAt?: Date
}
