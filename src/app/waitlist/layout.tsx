"use client";

import HeaderSimplified from "@/components/layout/HeaderSimplified";
import Footer from "@/components/layout/Footer";
import MobileGuard from "@/components/layout/MobileGuard";
import { ReactNode, useEffect, useState, useRef } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      if (currentScrollY < 50 || currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 300);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  return (
    <div className="flex min-h-screen flex-col">
      <div
        className={`fixed top-0 left-0 right-0 z-100 transition-transform duration-500
          ${isVisible || isMenuOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <HeaderSimplified />
      </div>

      <MobileGuard />

      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-90 bg-plp-maroon/10 backdrop-blur-md transition-all duration-700
          ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      <main
        className={`grow pt-16 transition-all duration-700 
          ${isMenuOpen ? "scale-[0.98] origin-top brightness-90" : "scale-100 brightness-100"}
        `}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
