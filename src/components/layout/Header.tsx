"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  BookOpen,
  User,
  Archive as ArchiveIcon,
} from "lucide-react";
import { Label } from "../common/Typography";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center p-0 border-b-2 border-plp-maroon bg-plp-parchment/90 backdrop-blur-md text-plp-navy">
        <button
          onClick={() => setIsOpen(true)}
          className="p-6 transition-colors border-r-2 border-plp-maroon hover:bg-plp-maroon hover:text-plp-parchment focus:outline-none"
        >
          <Menu size={24} />
        </button>

        <div className="flex-1 px-8">
          <Link href="/" className="inline-block group">
            <h1 className="text-3xl lowercase transition-all font-seventies tracking-tighter group-hover:italic">
              the preloved professional
            </h1>
          </Link>
        </div>

        <div className="items-center hidden h-full md:flex">
          <Link
            href="/"
            className="px-8 py-6 border-l-2 border-plp-maroon uppercase text-[10px] font-black tracking-[0.2em] hover:italic transition-all"
          >
            Archives
          </Link>
          <Link
            href="/signup"
            className="px-8 py-6 flex items-center gap-2 border-l-2 border-plp-maroon bg-plp-lime hover:bg-plp-maroon hover:text-plp-parchment transition-colors uppercase text-[10px] font-black tracking-[0.2em]"
          >
            Access Request <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-screen w-full md:w-112.5 bg-plp-maroon text-plp-parchment z-50 transform transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-8 border-b border-plp-parchment/10">
          <Label className="text-plp-parchment/40">
            Reference: Navigation Index
          </Label>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 transition-transform duration-300 hover:rotate-90"
          >
            <X size={32} />
          </button>
        </div>

        <nav className="flex flex-col justify-center flex-1 p-10 gap-10">
          {[
            { name: "Index", icon: <ArrowUpRight />, to: "/" },
            { name: "Archive", icon: <ArchiveIcon />, to: "/" },
            { name: "Philosophy", icon: <BookOpen />, to: "/" },
            { name: "Membership", icon: <User />, to: "/signup" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.to}
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between text-3xl md:text-5xl font-black uppercase tracking-tighter hover:italic transition-all leading-none"
            >
              <span className="relative">
                {item.name}
                <span className="absolute left-0 -bottom-2 w-0 h-1 bg-plp-lime transition-all duration-500 group-hover:w-full" />
              </span>
              <div className="transition-all duration-300 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-plp-lime">
                {item.icon}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 backdrop-blur-sm bg-plp-navy/60 transition-opacity"
        />
      )}
    </>
  );
}
