import { getProducts } from "../../../utils/dataHooks/getProducts"
import AdminProductsScreen from "./AdminProducts"

export default async function AdminProductsPage() {
  const products = await getProducts()

  if (!products) {
    return <div>Failed to load</div>
  }

  return <AdminProductsScreen products={products} />
}
