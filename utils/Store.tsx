import { atomWithStorage } from "jotai/utils"
import { Product } from "./dataHooks/getProducts"

export type CartItem = {
  product: Product
  quantity: number
}

export type Cart = {
  cartItems: CartItem[]
  cartOpen: boolean
}

const cartAtom = atomWithStorage<Cart>("cart", {
  cartItems: [],
  cartOpen: false,
})

export default cartAtom

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
