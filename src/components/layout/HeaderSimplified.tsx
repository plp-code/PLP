"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthAction from "../features/login/AuthBtn";
import BackButton from "@/components/ui/BackBtn";
import { useAuthUser } from "@/context/AuthContext";

export default function HeaderSimplified() {
  const pathname = usePathname();

  const { isAuthenticated, isLoading } = useAuthUser();
  const isMapsPage = pathname === "/maps";

  return (
    <header className="fixed top-0 left-0 w-full z-[100] flex flex-col bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] border-b-2 border-plp-navy">
      <div className="relative flex items-center justify-between h-14 bg-plp-maroon p-2 mx-1 my-1 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
        <div className="z-10 flex items-center shrink-0">
          <BackButton />
        </div>

        <div className="absolute inset-x-0 flex justify-center pointer-events-none px-14 min-[375px]:px-16 sm:px-24">
          <Link
            href="/"
            className="pointer-events-auto font-seventies text-white tracking-tight uppercase hover:opacity-90 transition-opacity truncate"
          >
            <span className="text-[11px] min-[375px]:text-sm sm:text-lg md:text-xl whitespace-nowrap">
              The Preloved Professional
            </span>
          </Link>
        </div>

        <div className="z-10 flex items-center justify-end h-full shrink-0">
          {isMapsPage && !isLoading && (
            <AuthAction isLoggedIn={isAuthenticated} />
          )}
        </div>
      </div>
    </header>
  );
}