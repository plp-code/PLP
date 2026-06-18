import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
