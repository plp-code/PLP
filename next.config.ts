import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  // HSTS is set by Vercel.
];

// Report-only: nothing is blocked; violations show in the browser console.
// Hosts below come from what the source references (globals.css, MapComponent,
// Hero/Memo/Header textures). Confirm with a console pass on the live site,
// run ~1 week, then switch the header name to Content-Security-Policy.
// TODO: replace 'unsafe-inline' with nonces (Next inlines scripts/styles).
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://basemaps.cartocdn.com https://www.transparenttextures.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

// Dev needs eval/websockets for HMR, which would only add noise.
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
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/maps",
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
