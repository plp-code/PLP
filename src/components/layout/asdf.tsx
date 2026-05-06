"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  User,
  LogIn,
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
    { name: "Home", icon: <Globe size={24} />, to: "/#home" },
    { name: "Manifesto", icon: <Scroll size={24} />, to: "/#manifesto" },
    { name: "Philosophy", icon: <BookOpen size={24} />, to: "/#philosophy" },
    { name: "About Us", icon: <User size={24} />, to: "/#about" },
    { name: "Membership", icon: <LogIn size={24} />, to: "/waitlist" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] bg-[#c0c0c0] p-1 shadow-[inset_2px_2px_#fff,inset_-2px_-2px_#808080] border-b-2 border-black">
        {/* THE MAIN SYSTEM BAR */}
        <div className="flex items-center justify-between h-16 bg-plp-maroon p-1.5 shadow-[inset_2px_2px_#dfdfdf,inset_-2px_-2px_#0a0a0a]">
          {/* THE CONTROL BOX (MENU TOGGLE) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center w-12 h-12 bg-[#c0c0c0] shadow-[inset_2px_2px_#fff,inset_-2px_-2px_#808080] active:shadow-[inset_-2px_-2px_#fff,inset_2px_2px_#808080] group"
            title="System Menu"
          >
            {/* Iconic Windows 3.1 "Dash" Control */}
            <div className="w-6 h-1.5 bg-black shadow-[0_3px_0_#808080]" />
          </button>

          {/* CENTER TITLE */}
          <Link
            href="/"
            className="flex-1 text-center font-seventies text-white text-2xl md:text-3xl tracking-tight uppercase px-4 select-none"
          >
            The Preloved Professional
          </Link>

          {/* FUNCTIONAL ACTION: ACCESS REQUEST */}
          <Link
            href="/waitlist"
            className="flex items-center justify-center h-12 px-6 bg-plp-lime text-plp-maroon font-black text-xs md:text-sm uppercase tracking-widest shadow-[inset_2px_2px_#fff,inset_-2px_-2px_#808080] hover:brightness-105 active:shadow-[inset_-2px_-2px_#fff,inset_2px_2px_#808080] transition-all"
          >
            <span className="hidden md:inline mr-2">Access Request</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </header>

      {/* --- SIDEBAR DIALOG --- */}
      <aside
        className={`fixed top-0 left-0 h-screen w-full md:w-[500px] bg-[#c0c0c0] z-[110] transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border-r-4 border-black shadow-[10px_0_30px_rgba(0,0,0,0.5)] flex flex-col ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Aside Title Bar */}
        <div className="flex items-center justify-between h-14 bg-plp-maroon p-2 m-1.5 shadow-[inset_2px_2px_#dfdfdf,inset_-2px_-2px_#0a0a0a]">
          <span className="text-white font-bold text-lg md:text-xl uppercase px-4">
            Navigation Index
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center w-10 h-10 bg-[#c0c0c0] shadow-[inset_2px_2px_#fff,inset_-2px_-2px_#808080] active:shadow-[inset_-2px_-2px_#fff,inset_2px_2px_#808080]"
          >
            <X size={24} className="text-black" strokeWidth={3} />
          </button>
        </div>

        {/* Aside Navigation Area */}
        <nav
          className="flex-1 flex flex-col p-10 gap-8 bg-white m-1.5 mt-0 shadow-[inset_3px_3px_#808080] overflow-y-auto"
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
              className="group flex items-center gap-8 text-4xl md:text-5xl font-seventies uppercase tracking-tight text-plp-maroon hover:text-blue-700 active:translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-[#c0c0c0] shadow-[inset_2px_2px_#fff,inset_-2px_-2px_#808080] group-hover:bg-plp-lime transition-colors">
                {item.icon}
              </div>
              <span className="underline decoration-transparent group-hover:decoration-blue-700 underline-offset-8">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Aside Footer Status */}
        <div className="p-4 bg-[#c0c0c0] border-t-2 border-[#808080] flex justify-between items-center mx-1.5 mb-1.5">
          <Label className="text-xs font-bold text-black/70 uppercase">
            Est. 2026 // Archive Index
          </Label>
          <div className="bg-white shadow-[inset_2px_2px_#808080] px-4 py-1 text-[10px] font-mono font-bold text-green-700">
            SYSTEM: ONLINE
          </div>
        </div>
      </aside>

      {/* Click-to-Close Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[105] cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
