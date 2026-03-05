/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com','pub-3fdeb510323e47e592c067c00b52e4a3.r2.dev'], // Permite carregar imagens deste domínio
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
