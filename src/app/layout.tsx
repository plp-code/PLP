import "./globals.css";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "The Preloved Professional",
    template: "%s | The Preloved Professional",
  },
  // description:
    // "Curated thrift and secondhand maps for professional workwear. Vetted in person with notes on pricing, standout finds, and what to look for.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
    ],
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