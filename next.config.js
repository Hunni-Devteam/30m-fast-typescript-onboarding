/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'www.leslipfrancais.fr',
    ],
  },
}

module.exports = nextConfig
