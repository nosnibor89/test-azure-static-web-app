/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.ctfassets.net']
  },
  experimental: {
    images: {
      unoptimized: true
    }
  }
}

module.exports = nextConfig
