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
    { name: "Home", icon: <Globe size={20} />, to: "/#home" },
    { name: "Manifesto", icon: <Scroll size={20} />, to: "/#manifesto" },
    { name: "Philosophy", icon: <BookOpen size={20} />, to: "/#philosophy" },
    { name: "About Us", icon: <User size={20} />, to: "/#about" },
    { name: "Membership", icon: <LogIn size={20} />, to: "/waitlist" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-100 flex flex-col bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] border-b border-black">
        <div className="flex items-center justify-between h-20 bg-plp-maroon p-4 mx-1 mt-1 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="cursor-pointer flex items-center justify-center w-12 h-12 bg-[#c0c0c0] shadow-[inset_2px_2px_#fff,inset_-2px_-2px_#808080] active:shadow-[inset_-2px_-2px_#fff,inset_2px_2px_#808080] group"
          >
            <div className="w-5 h-1.5 bg-black shadow-[0_3px_0_#808080]" />
          </button>

          <div className="flex-1 text-center">
            <Link
              href="/"
              className="font-seventies text-white text-xl tracking-tight uppercase px-4"
            >
              The Preloved Professional
            </Link>
          </div>

          <div className="flex items-center h-full gap-1">
            <Link
              href="/waitlist"
              className="cursor-pointer flex items-center h-full px-3 bg-plp-lime text-plp-maroon font-bold text-[16px] uppercase tracking-tighter shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] hover:brightness-110 active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080]"
            >
              Access Request <ArrowUpRight size={12} className="ml-1" />
            </Link>
          </div>
        </div>

        {/* something to add with more functionalities? */}
        <div className="flex items-center gap-10 px-6 py-2 text-sm font-bold text-black border-b border-[#808080] bg-[#c0c0c0]">
          <button className="hover:bg-plp-maroon hover:text-white px-2 transition-colors cursor-pointer underline underline-offset-4 decoration-1">
            Coming Soon
          </button>
          <button className="hover:bg-plp-maroon hover:text-white px-2 transition-colors cursor-pointer underline underline-offset-4 decoration-1">
            Add
          </button>
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-screen w-full md:w-112.5 bg-[#c0c0c0] z-110 transform transition-transform duration-500 ease-in-out border-r-2 border-black shadow-[4px_0_15px_rgba(0,0,0,0.3)] flex flex-col ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Title Bar */}
        <div className="flex items-center justify-between h-10 bg-plp-maroon p-1 m-1 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
          <span className="text-white font-bold text-sm uppercase px-4"></span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="cursor-pointer flex items-center justify-center w-8 h-8 bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080]"
          >
            <X size={18} />
          </button>
        </div>

        <nav
          className="flex-1 flex flex-col p-8 gap-8 bg-white m-1 mt-0 shadow-[inset_2px_2px_#808080]"
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
              className="group flex items-center gap-6 text-3xl md:text-5xl font-seventies uppercase tracking-tight text-plp-maroon hover:text-blue-700 transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] group-hover:bg-plp-lime">
                {item.icon}
              </div>
              <span className="border-b-2 border-transparent group-hover:border-blue-700">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="p-4 bg-[#c0c0c0] border-t border-[#808080] flex justify-between items-center mx-1 mb-1">
          <div className="w-24 h-6 bg-white shadow-[inset_1px_1px_#808080] flex items-center px-2 text-[9px] font-mono">
            STATUS: OK
          </div>
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
