/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "i.imgur.com",
      "cdn.discordapp.com",
      "lh3.googleusercontent.com",
      "picsum.photos",
    ],
  },
}

module.exports = nextConfig
