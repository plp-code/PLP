"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthAction from "../features/login/AuthBtn";
import BackButton from "@/components/ui/BackBtn"; 
import { useAuthUser } from "@/context/AuthContext"; 

export default function HeaderSimplified() {
  const pathname = usePathname();
  
  const { isAuthenticated, isLoading } = useAuthUser(); 

  const isLoginPage = pathname === "/login";

  return (
    <header className="fixed top-0 left-0 w-full z-100 flex flex-col bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] border-b-2 border-black">
      <div className="flex items-center justify-between h-14 bg-plp-maroon p-2 mx-1 my-1 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
        <div className="flex-1 flex justify-start pl-1">
          {isLoginPage ? <BackButton /> : null}
        </div>

        <div className="flex-none text-center">
          <Link
            href="/"
            className="font-seventies text-white text-lg md:text-xl tracking-tight uppercase px-4"
          >
            The Preloved Professional
          </Link>
        </div>

        <div className="flex-1 flex justify-end items-center h-full pr-1">
          {!isLoginPage && !isLoading && (
            <AuthAction isLoggedIn={isAuthenticated} />
          )}
        </div>
      </div>
    </header>
  );
}