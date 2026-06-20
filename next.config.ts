import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://octopus-app-gd7vr.ondigitalocean.app/api/v1/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/maps",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
