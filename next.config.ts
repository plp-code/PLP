import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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