import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  // HSTS is set by Vercel.
];

const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://*.basemaps.cartocdn.com https://www.transparenttextures.com",
  "connect-src 'self' https://*.basemaps.cartocdn.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const headers =
  process.env.NODE_ENV === "production"
    ? [
        ...securityHeaders,
        { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
      ]
    : securityHeaders;

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers }];
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
