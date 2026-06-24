"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, LogOut, Loader2 } from "lucide-react";
import { useAuthUser } from "@/context/AuthContext";

export default function AuthAction({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { logout, isAuthBusy } = useAuthUser();
  const pathname = usePathname();

  if (isLoggedIn) {
    return (
      <button
        onClick={() => logout()}
        disabled={isAuthBusy}
        className="plp-btn cursor-pointer uppercase flex items-center gap-1.5 h-10 md:h-9 px-3 sm:px-4 font-bold text-[11px] md:text-[13px] capitalize tracking-tighter disabled:opacity-70 disabled:cursor-wait"
      >
        {isAuthBusy ? (
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
      className="plp-btn-blue cursor-pointer uppercase flex items-center gap-1.5 h-10 md:h-9 px-3 sm:px-4 font-bold text-[11px] md:text-[13px] capitalize tracking-tighter"
    >
      Login<LogIn size={14} />
    </Link>
  );
}