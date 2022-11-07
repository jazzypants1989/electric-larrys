import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../lib/context";
import {
  BuyButton,
  BuyCart,
  Card,
  CardButton,
  CardInfo,
  Cards,
  CartStyle,
  CartWrapper,
  EmptyStyle,
  TotalPrice,
} from "../styles/CartStyles";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Quantity } from "../styles/NavStyles";
import getStripe from "../lib/getStripe";

export default function Cart() {
  const { cartItems, setCartItems, cartOpen, setCartOpen } = useCart();

  const handleRemove = (slug) => {
    setCartItems(cartItems.filter((item) => item.slug !== slug));
  };

  const findCartItemAndIncrement = (slug) => {
    const item = cartItems.find((item) => item.slug === slug);
    item.quantity++;
    setCartItems([...cartItems]);
  };

  const findCartItemAndDecrement = (slug) => {
    const item = cartItems.find((item) => item.slug === slug);
    if (item.quantity === 1) {
      handleRemove(slug);
    } else {
      item.quantity--;
      setCartItems([...cartItems]);
    }
  };

  const findTotal = () => {
    let roughTotal = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    return roughTotal.toFixed(2);
  };

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    });
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  const card = {
    hidden: { opacity: 0, scale: 0.5, x: 100 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.33, ease: "easeInOut" }}
      onClick={() => setCartOpen(false)}
    >
      <CartStyle
        initial={{ x: "100%" }}
        animate={{ x: cartOpen ? 0 : "100%" }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        layout
      >
        {!cartItems.length && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15 }}
          >
            <RiShoppingCart2Fill />
            <h1>
              This is where all your cool stuff would be. <br />
              <br /> But, it&apos;s empty. How sad. 😞
            </h1>
          </EmptyStyle>
        )}
        {cartItems.length > 0 && (
          <Cards variants={card} initial="hidden" animate="visible" layout>
            {cartItems.map((item) => (
              <Card variants={card} key={item.slug}>
                <Link href={`/products/${item.slug}`}>
                  <Image
                    src={item.image.data.attributes.formats.small?.url}
                    alt={item.title}
                    width={125}
                    height={125}
                  />
                  {console.log(item)}
                </Link>
                <CardInfo>
                  <Link href={`/products/${item.slug}`}>
                    <p>{item.title}</p>
                  </Link>
                  <p>${item.price}</p>
                  <Quantity>
                    <AiFillMinusCircle
                      onClick={() => findCartItemAndDecrement(item.slug)}
                    />
                    <span>{item.quantity}</span>
                    <AiFillPlusCircle
                      onClick={() => findCartItemAndIncrement(item.slug)}
                    />
                  </Quantity>
                  <CardButton onClick={() => handleRemove(item.slug)}>
                    Remove
                  </CardButton>
                </CardInfo>
              </Card>
            ))}
            {findTotal() < 0.01 ? null : (
              <BuyCart>
                <TotalPrice> Total: ${findTotal()}</TotalPrice>
                <BuyButton onClick={handleCheckout}>Gimme!</BuyButton>
              </BuyCart>
            )}
          </Cards>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
