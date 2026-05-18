/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async redirects() {
    return [
      {
        source: '/:path((?!_next|api|favicon.ico).*)',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
