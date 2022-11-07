import axios from "axios";
import {
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
} from "react";
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
  FilterByCategory,
  FilterByTags,
  SortByPrice,
  categoryFilter,
  tagFilter,
} from "../utils/Filter";

export default function SearchPage({ products }) {
  const [sort, setSort] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortProducts, setSortProducts] = useState([]);

  let categories = categoryFilter(products);
  let tags = tagFilter(products);

  const [category, setCategory] = useState(
    categories.find((category) => category.active)
  );
  const [tag, setTag] = useState(tags.find((tag) => tag.active));

  const handleFilter = useCallback(
    (products) => {
      if (category) {
        products = FilterByCategory(products, category.name);
      }
      if (tag) {
        products = FilterByTags(products, tag.name);
      }
      return products;
    },
    [category, tag]
  );

  const handleSort = useCallback(
    (products) => {
      if (sort) {
        products = SortByPrice(products, sort);
      }
      return products;
    },
    [sort]
  );

  useEffect(() => {
    setFilteredProducts(handleFilter(products));
  }, [products, handleFilter]);

  useEffect(() => {
    setSortProducts(handleSort(filteredProducts));
  }, [filteredProducts, handleSort]);

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

  return (
    <Layout title="Search">
      <div className="row">
        <div className="col-3">
          <h3>Filter</h3>
          <CategoryBox categories={categories} setCategory={setCategory} />
          <TagBox tags={tags} setTag={setTag} />
        </div>
        <div className="col-9">
          <h3>Sort</h3>
          <SortBox sort={sort} setSort={setSort} />
          <div className="row">
            {sortProducts.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                addToCartHandler={addToCartHandler}
              />
            ))}
          </div>
        </div>
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
