import "./globals.css";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://theprelovedprofessional.com"),
  title: {
    default: "The Preloved Professional",
    template: "%s | The Preloved Professional",
  },
  description:
    "Professional identity through clothing. Preloved work wardrobes, career confidence, and community.",
  keywords: [
    "thrift store map",
    "secondhand workwear",
    "vintage professional clothing",
    "thrift shopping guide",
    "preloved fashion",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theprelovedprofessional.com",
    siteName: "The Preloved Professional",
    title: "The Preloved Professional",
    description:
      "Professional identity through clothing. Preloved work wardrobes, career confidence, and community.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Preloved Professional",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <AuthProvider>
            <main className="flex-1">{children}</main>
            <Analytics />
            <SpeedInsights />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
