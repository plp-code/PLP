import HeaderSimplified from "@/components/layout/HeaderSimplified";
import Footer from "@/components/layout/Footer";
import MobileGuard from "@/components/layout/MobileGuard";
import { ReactNode } from "react";

export default function SimplifiedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 right-0 z-100">
        <HeaderSimplified />
      </div>

      <MobileGuard />

      <div className="grow pt-16">
        {children}
      </div>

      <Footer />
    </div>
  );
}