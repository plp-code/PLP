import HeaderShell from "@/components/layout/HeaderShell";
import Footer from "@/components/layout/Footer";
import { ReactNode } from "react";

export default function SimplifiedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative -mt-[calc(var(--header-offset)-var(--header-h))]">
        <HeaderShell>
          <main>{children}</main>
        </HeaderShell>
      </div>
      <Footer />
    </div>
  );
}
