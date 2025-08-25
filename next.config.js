/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled to allow SSR/ISR for dynamic routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
