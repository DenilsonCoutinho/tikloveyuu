/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['firebasestorage.googleapis.com'], // Permite carregar imagens deste domínio
    },
  };
  
  export default nextConfig;
  