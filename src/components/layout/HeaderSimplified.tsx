"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AuthAction from "../features/login/AuthBtn";
import BackButton from "@/components/ui/BackBtn";
import { useAuthUser } from "@/context/AuthContext";

export default function HeaderSimplified() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);  const pathname = usePathname();

  const { isAuthenticated, isLoading } = useAuthUser();
  const isMapsPage = pathname === "/maps";

  return (
    <header className="fixed top-0 left-0 w-full z-[100] flex flex-col bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] border-b-2 border-black">
      <div className="relative flex items-center justify-between h-14 bg-plp-maroon mx-1 my-1 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
        <div className="z-10 pl-2">{!isMapsPage && <BackButton />}</div>

        <div className="absolute inset-x-0 flex justify-center pointer-events-none px-12 min-[375px]:px-14 sm:px-20">
          <Link
            href="/"
            className="pointer-events-auto font-seventies text-white tracking-tight uppercase hover:opacity-90 transition-opacity truncate"
          >
            {isMobile ? (
              <span className="text-sm min-[375px]:text-base sm:text-lg md:text-xl whitespace-nowrap">
                PLP
              </span>
            ) : (
              <span className="text-xs min-[375px]:text-sm sm:text-lg md:text-xl whitespace-nowrap">
                The Preloved Professional
              </span>
            )}
          </Link>
        </div>

        <div className="z-10 pr-2 flex items-center h-full">
          {isMapsPage && !isLoading && (
            <AuthAction isLoggedIn={isAuthenticated} />
          )}
        </div>
      </div>
    </header>
  );
}
