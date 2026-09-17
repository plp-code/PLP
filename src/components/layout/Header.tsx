"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  Building2,
  Compass,
  Globe,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  X,
  LogIn,
} from "lucide-react";
import { Label } from "../ui/Typography";
import { useAuthUser } from "@/context/AuthContext";
import AuthAction from "../features/auth/AuthBtn";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const { isAuthenticated, isLoading, logout, isAuthBusy } = useAuthUser();

  const navItems = [
    { name: "Home", icon: <Globe size={17} />, to: "/#home" },
    { name: "The Memo", icon: <Mail size={17} />, to: "/#memo" },
    { name: "Maps", icon: <MapPin size={17} />, to: "/#maps" },

    {
      name: "Experiences & Services",
      icon: <Compass size={17} />,
      to: "/experiences-services",
    },
    {
      name: "For Organizations",
      icon: <Building2 size={17} />,
      to: "/organizations",
    },
  ];

  return (
    <>
      <header className="w-full flex flex-col bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] border-b-2 border-plp-navy">
        <div className="flex items-center justify-between h-14 bg-plp-maroon p-2 mx-1 my-1 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
          <div className="flex-1 flex justify-start">
            <button
              type="button"
              aria-label="Open navigation"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
              className="flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-1 bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080]"
            >
              <div className="w-4 h-0.5 bg-plp-navy" />
              <div className="w-4 h-0.5 bg-plp-navy" />
              <div className="w-4 h-0.5 bg-plp-navy" />
            </button>
          </div>

          <div className="text-center whitespace-nowrap">
            <Link
              href="/"
              className="px-3 font-seventies text-[17px] leading-none tracking-[-0.02em] text-white md:text-xl"
            >
              The Preloved Professional
            </Link>
          </div>

          <div className="flex-1 flex justify-end items-center h-full">
            {isLoading ? (
              <div className="flex items-center h-9 px-3">
                <Loader2 size={16} className="animate-spin text-plp-white" />
              </div>
            ) : (
              <AuthAction isLoggedIn={isAuthenticated} />
            )}
          </div>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-0 z-110 flex h-dvh w-full flex-col border-r-2 border-plp-navy bg-[#c0c0c0] shadow-[4px_0_15px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-out sm:w-[360px] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-10 bg-plp-maroon p-1 m-1 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
          <span className="text-white font-bold text-xs uppercase px-4 tracking-widest">
            Index
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            type="button"
            aria-label="Close navigation"
            className="cursor-pointer flex items-center justify-center w-7 h-7 bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080]"
          >
            <X size={16} />
          </button>
        </div>

        <nav
          className="m-1 mt-0 flex flex-1 flex-col overflow-y-auto bg-white px-4 py-5 shadow-[inset_2px_2px_#808080] md:px-5 md:py-6"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/notebook.png')",
          }}
        >
          <div className="border-t border-plp-maroon/15">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center gap-3 border-b border-plp-maroon/15 px-2 py-3 text-plp-maroon transition-colors hover:bg-plp-lime/15 md:py-3.5"
              >
                {/* <span className="w-5 shrink-0 font-mono text-[9px] tabular-nums text-plp-maroon/35">
                  {String(index + 1).padStart(2, "0")}
                </span> */}

                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#c0c0c0] text-plp-navy shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] transition-colors group-hover:bg-plp-lime">
                  {item.icon}
                </div>

                <span className="font-bodoni text-[18px] font-semibold leading-tight tracking-[-0.01em] md:text-[20px]">
                  {item.name}
                </span>

                <span
                  aria-hidden="true"
                  className="ml-auto font-mono text-xs text-plp-maroon/25 transition-transform group-hover:translate-x-1 group-hover:text-plp-maroon"
                >
                  &rarr;
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <p className="mb-2 px-2 font-mono text-[9px] uppercase tracking-[0.18em] text-plp-navy/40">
              Account
            </p>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
                disabled={isAuthBusy}
                className="group flex w-full items-center gap-3 border border-plp-maroon/20 px-3 py-2.5 text-left text-plp-maroon transition-colors hover:bg-plp-maroon hover:text-white disabled:cursor-wait disabled:opacity-60"
              >
                <span className="flex h-7 w-7 items-center justify-center">
                  {isAuthBusy ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <LogOut size={16} />
                  )}
                </span>

                <span className="font-prata text-[12px] font-semibold uppercase tracking-[0.12em]">
                  Logout
                </span>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="group flex w-full items-center gap-3 border border-plp-maroon/20 px-3 py-2.5 text-plp-maroon transition-colors hover:bg-plp-maroon hover:text-white"
              >
                <LogIn size={16} />

                <span className="font-prata text-[12px] font-semibold uppercase tracking-[0.12em]">
                  Login
                </span>
              </Link>
            )}
          </div>
        </nav>

        <div className="p-3 bg-[#c0c0c0] border-t border-[#808080] flex justify-between items-center mx-1 mb-1">
          <div className="w-20 h-5 bg-white shadow-[inset_1px_1px_#808080] flex items-center px-2 text-[8px] font-mono">
            VER: 2.0.0
          </div>
          <Label className="text-[9px] opacity-40 uppercase font-bold">
            Est. 2026
          </Label>
        </div>
      </aside>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-105"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
