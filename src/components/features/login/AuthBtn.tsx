"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, LogOut, Loader2 } from "lucide-react";
import { useAuthUser } from "@/context/AuthContext";

export default function AuthAction({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { logout, isLoading } = useAuthUser();
  const pathname = usePathname();

  if (isLoggedIn) {
    return (
      <button
        onClick={() => logout()}
        disabled={isLoading}
        className="cursor-pointer uppercase flex items-center gap-1.5 h-10 md:h-9 px-3 sm:px-4 bg-[#c0c0c0] text-black font-bold text-[11px] md:text-[13px] capitalize tracking-tighter shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] hover:brightness-105 active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080] disabled:opacity-70 disabled:cursor-wait transition-all"
      >
        {isLoading ? (
          <>
            Wait<Loader2 size={14} className="animate-spin" />
          </>
        ) : (
          <>
            Logout<LogOut size={14} />
          </>
        )}
      </button>
    );
  }

  return (
    <Link
      href={{ pathname: "/login", query: { returnTo: pathname } }}
      className="cursor-pointer uppercase flex items-center gap-1.5 h-10 md:h-9 px-3 sm:px-4 bg-plp-babyblue text-plp-white font-bold text-[11px] md:text-[13px] capitalize tracking-tighter shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] hover:brightness-110 active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080] transition-all"
    >
      Login<LogIn size={14} />
    </Link>
  );
}