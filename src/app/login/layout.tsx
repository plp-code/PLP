import { ReactNode } from "react";
import HeaderSimplified from "@/components/layout/HeaderSimplified";
import MobileGuard from "@/components/layout/MobileGuard";
import { SiInstagram, SiTiktok, SiPinterest } from "react-icons/si";

const SOCIAL_LINKS = [
  { name: "Instagram", href: "#", icon: SiInstagram },
  { name: "TikTok", href: "#", icon: SiTiktok },
  { name: "Pinterest", href: "#", icon: SiPinterest },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col font-text selection:bg-plp-lime selection:text-plp-maroon">
      <div className="fixed top-0 left-0 right-0 z-50">
        <HeaderSimplified />
      </div>

      <MobileGuard />

      <main className="flex-1 flex pt-14">
        <div className="w-full lg:w-1/2 bg-plp-parchment relative flex items-center justify-center p-6 md:p-12 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 w-full max-w-[360px]">{children}</div>
        </div>

        <div className="hidden lg:flex w-1/2 bg-plp-maroon text-plp-parchment relative overflow-hidden flex-col justify-between p-12 lg:p-20 border-l-2 border-black">
          <div className="absolute -top-12 -right-12 text-plp-parchment/5 font-plp text-[25vw] leading-none pointer-events-none select-none">
            PLP
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl xl:text-5xl font-seventies leading-[0.85] mb-6 tracking-tight uppercase">
              The Preloved <br /> Professional
            </h2>
            <p className="text-plp-parchment/70 font-bold text-xs uppercase tracking-widest max-w-sm mb-8 leading-relaxed">
              some texts
            </p>
          </div>

          <div className="relative z-10 flex items-end justify-between w-full border-t border-plp-parchment/20 pt-6 mt-12">
            <nav className="flex gap-6" aria-label="Social links">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-plp-parchment/40 hover:text-plp-lime transition-colors duration-300"
                  title={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </nav>

            <div className="opacity-50 text-[9px] uppercase tracking-[0.2em] font-black text-right">
              <span>{currentYear} The Preloved Professional</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
