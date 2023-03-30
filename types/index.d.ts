import { Account, Session } from "next-auth"

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  category: string
  tags: string[]
  countInStock: number
  price: number
  salePrice: number
  isOnSale: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export type Products = Product[]

export type User = {
  id: string
  name: string
  email: string
  image: string
  createdAt: string
  updatedAt: string
  isAdmin: boolean
  isEmployee: boolean
  newsletter: boolean
  emailVerified: string
  password: string
  accounts: Account[]
  sessions: Session[]
  notes: Note[]
}

export type Users = User[]

export type Note = {
  id: string
  title: string
  link: string
  description: string
  image: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
  user: User
  userId: string
}

export type Notes = Note[]

export type Post = {
  id: string
  title: string
  link: string
  description: string
  image: string
  isFeatured: boolean
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export type Posts = Post[]

export type About = {
  id: string
  title: string
  description: string
  heroText: string
  heroImage: string
  otherImages: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export type Abouts = About[]

export type Announcement = {
  id: string
  title: string
  link: string
  description: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export type Announcements = Announcement[]
