"use client";

import Link from "next/link";
import { LogIn, LogOut, Loader2 } from "lucide-react";
import { useLogout } from "../../../hooks/useLogout";

export default function AuthAction({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { triggerLogout, isLoggingOut } = useLogout();

  if (isLoggedIn) {
    return (
      <button
        onClick={triggerLogout}
        disabled={isLoggingOut}
        className="cursor-pointer flex items-center h-9 px-3 bg-[#c0c0c0] text-black font-bold text-[11px] md:text-[13px] uppercase tracking-tighter shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] hover:brightness-105 active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080] disabled:opacity-70 disabled:cursor-wait"
      >
        {isLoggingOut ? (
          <>
            Wait<span className="hidden md:inline ml-1">...</span>
            <Loader2 size={14} className="ml-1 animate-spin" />
          </>
        ) : (
          <>
            Log<span className="hidden md:inline ml-1">out</span>
            <LogOut size={14} className="ml-1" />
          </>
        )}
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="cursor-pointer flex items-center h-9 px-3 bg-plp-babyblue text-plp-white font-bold text-[11px] md:text-[13px] uppercase tracking-tighter shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] hover:brightness-110 active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080]"
    >
      Log<span className="hidden md:inline ml-1">in</span>
      <LogIn size={14} className="ml-1" />
    </Link>
  );
}