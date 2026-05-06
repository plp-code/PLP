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
  return (
    <footer className="bg-plp-maroon text-plp-parchment border-t-2 border-plp-maroon relative overflow-hidden">
      <div className="absolute -top-16 -left-10 text-plp-parchment/3 font-plp text-[22vw] pointer-events-none select-none">
        PLP
      </div>

      <div className="relative z-10 pt-16 pb-12 md:pt-24 md:pb-16 text-center">
        <h2 className="text-[10vw] md:text-[7vw] font-seventies leading-[0.8] mb-12 tracking-tight uppercase italic">
          The Preloved <br className="md:hidden" /> Professional
        </h2>

        <div className="flex flex-col items-center gap-12 md:gap-16">
          <Link
            href="/signup"
            className="inline-flex items-center gap-6 px-14 py-5 border border-plp-parchment/20 rounded-full hover:bg-plp-lime hover:text-plp-maroon hover:border-plp-lime transition-all duration-700 group"
          >
            <span className="font-text font-bold uppercase tracking-[0.5em] text-sm md:text-base">
              Join Now
            </span>
            <ArrowUpRight
              size={20}
              className="group-hover:rotate-45 transition-transform"
            />
          </Link>

          <div className="flex justify-center gap-x-16 gap-y-10">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-all"
              >
                <social.icon
                  size={30}
                  className="opacity-40 group-hover:opacity-100 group-hover:text-plp-lime transition-all duration-500"
                />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] opacity-20 group-hover:opacity-100 transition-all">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-10 py-8 border-t border-plp-parchment/10">
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 opacity-40 text-[10px] uppercase tracking-[0.3em] font-black">
          {/* some label */}
        </div>

        <div className="mt-6 md:mt-0 opacity-80">
          <span className="font-plp text-5xl tracking-tighter">
            PLP<span className="text-xs align-top ml-1">™</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
