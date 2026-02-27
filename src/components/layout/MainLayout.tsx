import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileGuard from "./MobileGuard";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-plp-parchment min-h-screen text-plp-navy selection:bg-plp-lime selection:text-plp-maroon overflow-x-hidden flex flex-col">
      <MobileGuard />
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
