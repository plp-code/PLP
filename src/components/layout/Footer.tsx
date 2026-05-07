"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiInstagram, SiTiktok, SiPinterest } from "react-icons/si";
import { Label } from "../common/Typography";

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
      <div className="absolute -top-8 -left-6 text-plp-parchment/3 font-plp text-[14vw] pointer-events-none select-none">
        PLP
      </div>

      <div className="relative z-10 pt-10 pb-8 md:pt-16 md:pb-12 text-center">
        <h2 className="text-[8vw] md:text-[4.5vw] font-seventies leading-[0.85] mb-8 tracking-tight uppercase italic">
          The Preloved <br className="md:hidden" /> Professional
        </h2>

        <div className="flex flex-col items-center gap-8 md:gap-10">
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-3 px-8 py-3 border border-plp-parchment/20 rounded-full hover:bg-plp-lime hover:text-plp-maroon hover:border-plp-lime transition-all duration-500 group"
          >
            <span className="font-text font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
              Join Now
            </span>
            <ArrowUpRight
              size={14}
              className="group-hover:rotate-45 transition-transform"
            />
          </Link>

          <div className="flex justify-center gap-x-8 gap-y-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 transition-all"
              >
                <social.icon
                  size={20}
                  className="opacity-40 group-hover:opacity-100 group-hover:text-plp-lime transition-all duration-500"
                />
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] opacity-20 group-hover:opacity-100 transition-all">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-6 py-4 border-t border-plp-parchment/10">
        <div className="flex flex-col md:flex-row gap-3 md:gap-8 opacity-25 text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-black">
          <Label>© {currentYear} THE PRELOVED PROFESSIONAL</Label>
        </div>

        <div className="mt-4 md:mt-0 opacity-50">
          <span className="font-plp text-3xl tracking-tighter">
            PLP<span className="text-[8px] align-top ml-0.5">™</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
