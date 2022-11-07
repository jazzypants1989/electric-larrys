import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [order, setOrder] = useState({});
  return (
    <CartContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        cartItems,
        setCartItems,
        checkout,
        setCheckout,
        order,
        setOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const all = useContext(CartContext);
  return all;
}

// Path: components\Cart.js
