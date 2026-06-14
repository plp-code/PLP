// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/v1/:path*",
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
      {
        source: "/:path((?!maps|login|api|_next|favicon.ico).*)",
        destination: "/maps",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;