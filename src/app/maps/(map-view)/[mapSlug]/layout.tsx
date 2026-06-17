import HeaderSimplified from "@/components/layout/HeaderSimplified";
import { ReactNode } from "react";

export default function SimplifiedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-gray-100">
      <HeaderSimplified />

      <main className="flex-1 relative pt-16 w-full h-full">{children}</main>
    </div>
  );
}
