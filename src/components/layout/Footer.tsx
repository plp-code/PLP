"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiInstagram, SiTiktok, SiPinterest } from "react-icons/si";
import { Label } from "../ui/Typography";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/theprelovedprofessional/",
    icon: SiInstagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@theprelovedprofessional?_r=1&_t=ZP-94GLNLZX2sw",
    icon: SiTiktok,
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/theprelovedprofessional/?invite_code=7f38b38364d343c68fac55377394e027&sender=922182598607010050",
    icon: SiPinterest,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-plp-maroon text-plp-parchment border-t border-plp-maroon relative overflow-hidden">
      <div className="absolute -top-4 -left-4 text-[25vw] md:-top-8 md:-left-6 md:text-[14vw] text-plp-parchment/3 font-plp pointer-events-none select-none leading-none">
        PLP
      </div>

      <div className="relative z-10 pt-12 pb-10 md:pt-16 md:pb-12 text-center px-4">
        <h2 className="text-[11vw] sm:text-[8vw] md:text-[4.5vw] font-seventies leading-[0.85] mb-8 md:mb-10 tracking-tight uppercase">
          The Preloved <br className="md:hidden" /> Professional
        </h2>

        <div className="flex flex-col items-center gap-10 md:gap-10">
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-3 px-8 py-4 md:py-3 border border-plp-parchment/20 rounded-full hover:bg-plp-lime hover:text-plp-maroon hover:border-plp-lime transition-all duration-500 group active:scale-95"
          >
            <span className="font-text font-bold uppercase tracking-[0.3em] text-[11px] md:text-xs">
              Join Now
            </span>
            <ArrowUpRight
              size={16}
              className="group-hover:rotate-45 transition-transform md:w-3.5 md:h-3.5"
            />
          </Link>

          <nav
            className="flex justify-center gap-x-6 sm:gap-x-10"
            aria-label="Social links"
          >
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 transition-all p-2"
              >
                <social.icon
                  size={24}
                  className="opacity-40 group-hover:opacity-100 group-hover:text-plp-lime transition-all duration-500 md:w-5 md:h-5"
                />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 md:opacity-20 group-hover:opacity-100 transition-all">
                  {social.name}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-4 py-6 md:px-6 md:py-4 border-t border-plp-parchment/10 gap-4 md:gap-0 text-center md:text-left">
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 opacity-35 text-[9px] uppercase tracking-[0.2em] font-black items-center">
          <Label>text if we want</Label>
        </div>

        <div className="opacity-50 text-[9px] uppercase tracking-[0.2em] font-black text-center md:text-right">
          <span>{currentYear} The Preloved Professional</span>
        </div>
      </div>
    </footer>
  );
}
