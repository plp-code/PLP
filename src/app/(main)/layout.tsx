import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileGuard from "@/components/layout/MobileGuard";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <MobileGuard />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
