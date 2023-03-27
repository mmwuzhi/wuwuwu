/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  compiler: {
    // Enables the emotion SWC transform
    emotion: true,
  },
}

module.exports = nextConfig
