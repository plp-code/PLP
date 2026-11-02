import HeaderShell from "@/components/layout/HeaderShell";
import Footer from "@/components/layout/Footer";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderShell>
        <main>{children}</main>
      </HeaderShell>

      <Footer />
    </div>
  );
}
