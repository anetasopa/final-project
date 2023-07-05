// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     typedRoutes: true,
//     serverActions: true,
//   },
//   // reactStrictMode: true,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     domains: ['res.cloudinary.com'],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({});

const nextConfig = withPWA({
  dest: 'public',
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
});

module.exports = nextConfig;
