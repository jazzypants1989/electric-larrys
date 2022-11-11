/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "i.imgur.com",
      "cdn.discordapp.com",
      "google.com",
    ],
  },
}

module.exports = nextConfig
