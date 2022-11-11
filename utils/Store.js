import { createContext, useReducer } from "react"
import Cookies from "js-cookie"

export const Store = createContext()

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "" },
}

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      )
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case "CART_RESET":
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      }
    case "CART_CLEAR_ITEMS":
      return { ...state, cart: { ...state.cart, cartItems: [] } }

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      }
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      }
    case "CART_OPEN":
      return { ...state, cartOpen: true }
    case "CART_CLOSE":
      return { ...state, cartOpen: false }

    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{children}</Store.Provider>
}

export const reactions = [
  "🤩",
  "What a great choice!",
  "🤑",
  "You're going to love this!",
  "That is my grandma's favorite!",
  "I've bought a lot of things, and that is a good thing to buy.",
  "Man, I wish I had that! I'm jealous!",
  "I'm so glad you bought that! I was going to buy it, but you beat me to it!",
  "Did you know that this is the best thing ever?",
  "Dang! You're good at buying things!",
  "Wow! You're so cool!",
  "This is going to be the best thing you've ever bought!",
  "This is going to change your life!",
  "You're going to be so happy you bought this!",
  // creepy emojis
  "👀",
  "👁️‍🗨️",
]
