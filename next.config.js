/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/NearForceWeb' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/NearForceWeb/' : '',
}

module.exports = nextConfig