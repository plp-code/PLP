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
        className="plp-btn cursor-pointer uppercase flex items-center justify-center gap-1.5 h-10 w-10 md:w-auto md:h-9 md:px-4 font-bold text-[13px] capitalize tracking-tighter disabled:opacity-70 disabled:cursor-wait"
      >
        {isAuthBusy ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            <span className="hidden md:inline">Logout</span>
            <LogOut size={16} />
          </>
        )}
      </button>
    );
  }

  return (
    <Link
      href={{ pathname: "/login", query: { returnTo: pathname } }}
      className="plp-btn-blue cursor-pointer uppercase flex items-center justify-center gap-1.5 h-10 w-10 md:w-auto md:h-9 md:px-4 font-bold text-[13px] capitalize tracking-tighter"
    >
      <span className="hidden md:inline">Login</span>
      <LogIn size={16} />
    </Link>
  );
}