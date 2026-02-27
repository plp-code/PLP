import { ArrowUpRight } from "lucide-react";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/theprelovedprofessional/",
  },
  { name: "Some Social", href: "#" },
  { name: "Another Social", href: "#" },
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
            <a
              key={social.name}
              href={social.href}
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] hover:text-plp-lime transition-colors"
            >
              {social.name}
              <ArrowUpRight
                size={14}
                className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 p-8 text-[10px] uppercase tracking-[0.3em] opacity-60 font-black">
        <div className="text-center md:text-left mb-4 md:mb-0">
          © {currentYear} THE PRELOVED PROFESSIONAL
        </div>
        <div className="text-center md:text-right italic font-serif">
          Professionalism had a uniform. That era is over.
        </div>
      </div>
    </footer>
  );
}
