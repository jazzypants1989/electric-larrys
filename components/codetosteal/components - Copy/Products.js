import Image from "next/image";
import Link from "next/link";
import { ProductStyles } from "../styles/ProductStyle";
import styled from "styled-components";

export default function Product({ product }) {
  const { title, price, image, slug } = product.attributes;
  return (
    <ProductStyles>
      <Link href={`/product/${slug}`}>
        <div>
          <Image
            src={image.data.attributes.formats.medium?.url}
            alt={title}
            width="250"
            height="250"
            className="product-image"
          />
        </div>
        <h2>{title}</h2>
      </Link>
      <h3>${price}</h3>
    </ProductStyles>
  );
}

const PriceStyle = styled.h3`
  color: red;
  font-size: 2rem;
`;
