"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  User,
  LogIn,
  Menu,
  X,
  Scroll,
  Globe,
} from "lucide-react";
import { Label } from "../common/Typography";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const navItems = [
    { name: "Home", icon: <Globe size={20} />, to: "/#home" },
    { name: "Manifesto", icon: <Scroll size={20} />, to: "/#manifesto" },
    { name: "Philosophy", icon: <BookOpen size={20} />, to: "/#philosophy" },
    { name: "About Us", icon: <User size={20} />, to: "/#about" },
    { name: "Membership", icon: <LogIn size={20} />, to: "/waitlist" },
  ];

  return (
    <>
      <header
        className={`
          relative z-100 flex h-16 items-center border-b-2 border-plp-maroon bg-plp-parchment/90 
          transition-all duration-500
          ${isMenuOpen ? "backdrop-blur-none bg-plp-parchment" : "backdrop-blur-md"}
        `}
      >
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex h-full items-center px-6 transition-colors border-r-2 border-plp-maroon hover:bg-plp-maroon hover:text-plp-parchment focus:outline-none"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 px-6">
          <Link
            href="/"
            className="text-xl md:text-2xl capitalize font-seventies tracking-tight text-plp-maroon"
          >
            the preloved professional
          </Link>
        </div>

        <div className="hidden h-full md:flex">
          <Link
            href="/waitlist"
            className="flex items-center gap-2 px-8 h-full border-l-2 border-plp-maroon bg-plp-lime text-plp-maroon hover:bg-plp-maroon hover:text-plp-parchment transition-colors uppercase text-[10px] font-black tracking-[0.2em] font-text"
          >
            Access Request <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-screen w-full md:w-112.5 bg-plp-maroon text-plp-parchment z-110 transform transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col shadow-2xl ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-8 border-b border-plp-parchment/10">
          <Label className="text-plp-parchment/40 uppercase tracking-widest text-[10px]">
            Navigation Index
          </Label>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 transition-transform duration-300 hover:rotate-90 hover:text-plp-lime"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col justify-center flex-1 p-10 space-y-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.to}
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-center justify-between text-3xl md:text-5xl font-seventies uppercase tracking-tight transition-all leading-none"
            >
              <span className="relative">
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-plp-lime transition-all duration-500 group-hover:w-full" />
              </span>
              <div className="transition-all duration-300 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-plp-lime">
                {item.icon}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-plp-parchment/10">
          <Label className="text-[9px] opacity-40 uppercase tracking-[0.2em]">
            Est. 2026 / NYC — LAX
          </Label>
        </div>
      </aside>
    </>
  );
}
