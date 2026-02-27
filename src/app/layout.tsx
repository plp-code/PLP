import "./globals.css";
import { Metadata } from "next";

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
      </body>
    </html>
  );
}
