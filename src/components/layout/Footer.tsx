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
    <footer className="bg-plp-maroon text-plp-parchment border-t-2 border-plp-maroon">
      <div className="p-12 md:p-20 text-center border-b border-plp-parchment/10">
        <h2 className="text-5xl md:text-[12vw] font-seventies leading-[0.8] capitalize italic mb-8 tracking-tighter">
          (Some text)
        </h2>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
          {SOCIAL_LINKS.map((social) => (
            <div
              key={social.name}
              className="flex flex-row items-center gap-3 group"
            >
              <social.icon
                key={social.name}
                size={24}
                className="mx-auto group-hover:text-plp-lime transition-colors cursor-pointer"
              />
              <a
                href={social.href}
                className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] group-hover:text-plp-lime transition-colors"
              >
                {social.name}
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end p-8 text-[10px] uppercase tracking-[0.3em] opacity-60 font-black">
        <Label className="text-center md:text-right mb-4 md:mb-0">
          © {currentYear} THE PRELOVED PROFESSIONAL
        </Label>
      </div>
    </footer>
  );
}
