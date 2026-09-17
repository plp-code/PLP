"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

import AuthAction from "../features/auth/AuthBtn";
import BackButton from "@/components/ui/BackBtn";
import { useAuthUser } from "@/context/AuthContext";

export default function HeaderSimplified() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthUser();

  const isMapsPage = pathname === "/maps";

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b-2 border-plp-navy bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080]">
      <div className="mx-1 my-1 grid h-14 grid-cols-[1fr_auto_1fr] items-center bg-plp-maroon px-2 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
        <div className="flex min-w-0 items-center justify-start">
          <BackButton />
        </div>

        <Link
          href="/"
          aria-label="The Preloved Professional home"
          className="min-w-0 px-2 text-center font-seventies text-white transition-opacity hover:opacity-85"
        >
          <span className="block whitespace-nowrap text-[15px] leading-none tracking-[-0.02em] sm:text-lg md:text-xl">
            The Preloved Professional
          </span>
        </Link>

        <div className="flex min-w-0 items-center justify-end">
          {isMapsPage &&
            (isLoading ? (
              <div className="flex h-9 w-9 items-center justify-center">
                <Loader2 size={16} className="animate-spin text-white/70" />
              </div>
            ) : (
              <AuthAction isLoggedIn={isAuthenticated} />
            ))}
        </div>
      </div>
    </header>
  );
}
