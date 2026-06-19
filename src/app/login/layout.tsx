import { ReactNode } from "react";
import HeaderSimplified from "@/components/layout/HeaderSimplified";
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

      <main className="flex-1 flex pt-14">
        <div className="w-full md:w-1/2 bg-plp-parchment relative flex flex-col items-center justify-between md:justify-center p-4 sm:p-6 md:p-8 lg:p-12 overflow-x-hidden min-h-[calc(100vh-3.5rem)]">
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="md:hidden w-full h-8" />

          <div className="relative z-10 w-full max-w-[360px] mx-auto">
            {children}
          </div>

          <div className="relative z-10 md:hidden flex flex-col items-center gap-4 mt-12 mb-4">
            <nav className="flex gap-6" aria-label="Social links">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-plp-maroon/60 hover:text-plp-maroon transition-colors duration-300 p-2"
                  title={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </nav>
            <div className="opacity-60 text-[9px] uppercase tracking-[0.2em] font-black text-center text-plp-maroon">
              <span>{currentYear} The Preloved Professional</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:w-1/2 bg-plp-maroon text-plp-parchment relative overflow-hidden flex-col justify-between p-8 lg:p-16 xl:p-20 border-l-2 border-black">
          <div className="absolute -top-12 -right-12 text-plp-parchment/5 font-plp text-[25vw] leading-none pointer-events-none select-none">
            PLP
          </div>

          <div className="relative z-10 mt-8 md:mt-0">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-seventies leading-[0.85] mb-4 lg:mb-6 tracking-tight uppercase">
              The Preloved <br /> Professional
            </h2>
            <p className="text-plp-parchment/70 font-bold text-[10px] lg:text-xs uppercase tracking-widest max-w-sm mb-8 leading-relaxed">
              some texts
            </p>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between w-full border-t border-plp-parchment/20 pt-6 mt-12 gap-4 lg:gap-0">
            <nav className="flex gap-4 lg:gap-6" aria-label="Social links">
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

            <div className="opacity-50 text-[9px] uppercase tracking-[0.2em] font-black lg:text-right">
              <span>{currentYear} The Preloved Professional</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
