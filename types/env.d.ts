/* eslint-disable */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
      NEXT_PUBLIC_BASE_URL: string
      DATABASE_URL: string
      MONGODB_URI: string
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string
      NEXT_PUBLIC_CLOUDINARY_API_KEY: string
      NEXT_CLOUDINARY_URL: string
      CLOUDINARY_SECRET: string
      NEXT_PUBLIC_STRIPE_KEY: string
      STRIPE_SECRET: string
      GOOGLE_ID: string
      GOOGLE_SECRET: string
      DISCORD_CLIENT_ID: string
      DISCORD_CLIENT_SECRET: string
      NEXT_PUBLIC_SENDGRID_API_KEY: string
      EMAIL_SERVER_USER: string
      EMAIL_SERVER_PASSWORD: string
      EMAIL_SERVER_HOST: string
      EMAIL_SERVER_PORT: string
      EMAIL_FROM: string
    }
  }
}
