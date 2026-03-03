import "./globals.css";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "The Preloved Professional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-plp-parchment text-plp-navy">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
