"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, LogIn, X, Scroll, Globe } from "lucide-react";
import { Label } from "../common/Typography";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const navItems = [
    { name: "Home", icon: <Globe size={18} />, to: "/#home" },
    { name: "Manifesto", icon: <Scroll size={18} />, to: "/#manifesto" },
    { name: "Philosophy", icon: <BookOpen size={18} />, to: "/#philosophy" },
    { name: "Join", icon: <LogIn size={18} />, to: "/waitlist" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-100 flex flex-col bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] border-b border-black">
        <div className="flex items-center justify-between h-16 bg-plp-maroon p-2 mx-1 mt-1 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="cursor-pointer flex items-center justify-center w-10 h-10 bg-[#c0c0c0] shadow-[inset_2px_2px_#fff,inset_-2px_-2px_#808080] active:shadow-[inset_-2px_-2px_#fff,inset_2px_2px_#808080] group"
          >
            <div className="w-4 h-1 bg-black shadow-[0_2px_0_#808080]" />
          </button>

          <div className="flex-1 text-center">
            <Link
              href="/"
              className="font-seventies text-white text-lg md:text-xl tracking-tight uppercase px-4"
            >
              The Preloved Professional
            </Link>
          </div>

          <div className="flex items-center h-full gap-1">
            <Link
              href="/waitlist"
              className="cursor-pointer flex items-center h-full px-4 bg-plp-lime text-plp-maroon font-bold text-[14px] uppercase tracking-tighter shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] hover:brightness-110 active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080]"
            >
              Access Request <ArrowUpRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-8 px-6 py-1.5 text-xs font-bold text-black border-b border-[#808080] bg-[#c0c0c0]">
          <button className="hover:bg-plp-maroon hover:text-white px-2 transition-colors cursor-pointer underline underline-offset-2 decoration-1">
            Coming Soon
          </button>
          <button className="hover:bg-plp-maroon hover:text-white px-2 transition-colors cursor-pointer underline underline-offset-2 decoration-1">
            Add
          </button>
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-screen w-full md:w-96 bg-[#c0c0c0] z-110 transform transition-transform duration-500 ease-in-out border-r-2 border-black shadow-[4px_0_15px_rgba(0,0,0,0.3)] flex flex-col ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-10 bg-plp-maroon p-1 m-1 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
          <span className="text-white font-bold text-xs uppercase px-4 tracking-widest">
            Index
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="cursor-pointer flex items-center justify-center w-7 h-7 bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080]"
          >
            <X size={16} />
          </button>
        </div>

        <nav
          className="flex-1 flex flex-col p-6 gap-6 bg-white m-1 mt-0 shadow-[inset_2px_2px_#808080] overflow-y-auto"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/notebook.png')",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.to}
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-center gap-5 text-2xl md:text-3xl font-seventies uppercase tracking-tight text-plp-maroon hover:text-blue-700 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] group-hover:bg-plp-lime transition-all">
                {item.icon}
              </div>
              <span className="border-b-2 border-transparent group-hover:border-blue-700">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="p-3 bg-[#c0c0c0] border-t border-[#808080] flex justify-between items-center mx-1 mb-1">
          <div className="w-20 h-5 bg-white shadow-[inset_1px_1px_#808080] flex items-center px-2 text-[8px] font-mono">
            VER: 1.0.4
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
