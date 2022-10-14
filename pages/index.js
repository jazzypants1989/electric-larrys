import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import CategoryBox from "../components/CategoryBox";
import TagBox from "../components/TagBox";
import SortBox from "../components/SortBox";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";
import {
  categoryFilter,
  tagFilter,
  FilterByCategory,
  FilterByTags,
  SortByPrice,
} from "../utils/Filter";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error(
        "Sorry. I guess that item was too cool, cuz it looks like we are sold out."
      );
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to the cart");
  };

  let categories = categoryFilter(products);
  // find the category that is selected in the CategoryBox component
  let category = categories.find((category) => category.active);
  // if there is a category selected, filter the products by that category
  if (category) {
    products = FilterByCategory(products, category);
  }

  let tags = tagFilter(products);
  // find the tag that is selected in the TagBox component
  let tag = tags.find((tag) => tag.active);
  // if there is a tag selected, filter the products by that tag
  if (tag) {
    products = FilterByTags(products, tag);
  }

  // sort the products by price
  products = SortByPrice(products, state.sort);

  return (
    <Layout title="Home Page">
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-1">
          <CategoryBox categories={categories} />
          <TagBox tags={tags} />
          <SortBox />
        </div>
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

// Language: javascript
