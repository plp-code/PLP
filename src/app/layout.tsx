import "./globals.css";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "The Preloved Professional",
    template: "%s | The Preloved Professional",
  },
  description:
    "A curated marketplace and editorial home for preloved fashion, access, and map-based discovery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
        <main className="flex-1">{children}</main>
        <Analytics />
        <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}
