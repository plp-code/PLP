"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiInstagram, SiTiktok, SiPinterest } from "react-icons/si";

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
    <footer className="relative overflow-hidden bg-plp-maroon text-plp-parchment">
      <div className="relative z-10 px-5 pb-10 pt-12 md:px-8 md:pb-12 md:pt-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <h2 className="max-w-5xl font-seventies text-[clamp(3.25rem,7.5vw,6.5rem)] leading-[0.88] tracking-[-0.03em] text-plp-parchment">
            The Preloved Professional
          </h2>

          <Link
            href="/login"
            className="group mt-8 inline-flex items-center gap-2.5 border border-plp-parchment/60 px-6 py-3 font-prata text-[11px] font-semibold uppercase tracking-[0.12em] text-plp-parchment transition-colors duration-300 hover:border-plp-lime hover:bg-plp-lime hover:text-plp-maroon active:scale-[0.98]"
          >
            Join Today
            <ArrowUpRight
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <nav
            className="mt-10 flex items-center justify-center gap-6 sm:gap-9"
            aria-label="Social links"
          >
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group flex flex-col items-center gap-2 text-plp-parchment/50 transition-colors hover:text-plp-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plp-lime"
                >
                  <Icon
                    aria-hidden="true"
                    size={22}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  <span className="font-mono text-[9px] uppercase tracking-[0.14em]">
                    {social.name}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="relative z-10 border-t border-plp-parchment/15 px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-end">
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-plp-parchment/40">
            © {new Date().getFullYear()} The Preloved Professional™
          </p>
        </div>
      </div>
    </footer>
  );
}
