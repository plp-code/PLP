import { Briefcase, Globe, Command } from "lucide-react";
import Link from "next/link";
import { Container } from "../common/Container";
import { Label, Display } from "../common/Typography";

const FEATURES = [
  {
    label: "01",
    title: "Professional Identity",
    desc: "We treat preloved fashion as a professional strategy, not a compromise. Members use secondhand clothing to build presence, signal discernment, and move beyond status driven by constant consumption.",
    icon: Briefcase,
    theme: "light",
  },
  {
    label: "02",
    title: "Access & Opportunity",
    desc: "We create access to people, places, information, and opportunities that aren't visible through traditional career channels.",
    icon: Globe,
    theme: "dark",
  },
  {
    label: "03",
    title: "Community Led",
    desc: "We move ideas off the screen — through city-based resources, events, coworking activations, and shared physical experiences.",
    icon: Command,
    theme: "light",
  },
];

export default function FeatureFloatingGrid() {
  return (
    <Container className="pb-12 pt-16" borderBottom={true}>
      <div className="mb-20 border-l-4 border-plp-maroon pl-8">
        <Display className="text-4xl lg:text-7xl capitalize mb-4 leading-none">
          How We Serve
        </Display>
        <p className="text-[10px] md:text-xs text-plp-maroon/60 uppercase tracking-[0.2em] font-bold max-w-2xl leading-relaxed">
          The Preloved Professional supports career growth and professional
          presence through community, culture, and preloved practice.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center pb-16">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          const isDark = feature.theme === "dark";

          return (
            <Link
              key={feature.label}
              href="/signup"
              className={`
                group relative flex-1 p-8 
                transition-all duration-500 ease-in-out
                hover:flex-[1.4] 
                border-2 border-plp-maroon 
                shadow-[6px_6px_0px_0px_rgba(110,38,38,0.1)]
                hover:shadow-[12px_12px_0px_0px_rgba(110,38,38,0.15)]
                hover:-translate-y-3
                flex flex-col justify-between
                ${isDark ? "bg-plp-maroon text-plp-parchment" : "bg-white text-plp-maroon hover:bg-plp-lime"}
              `}
            >
              <div className="flex justify-between items-start mb-16">
                <div
                  className={`
                    w-12 h-12 flex items-center justify-center border-2 transition-all duration-500
                    group-hover:rotate-12
                    ${isDark ? "border-plp-lime text-plp-lime" : "border-plp-maroon"}
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <Label
                  className={`text-xs ${isDark ? "text-plp-lime" : "text-plp-maroon/30"}`}
                >
                  {feature.label}
                </Label>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-black uppercase italic leading-[0.9] tracking-tighter">
                  {feature.title}
                </h3>

                <div className="relative overflow-hidden transition-all duration-700 max-h-12 group-hover:max-h-48">
                  <p className="text-[11px] uppercase tracking-[0.12em] leading-relaxed font-bold opacity-90">
                    {feature.desc}
                  </p>

                  <div
                    className={`absolute inset-0 bg-linear-to-t pointer-events-none transition-opacity duration-500 group-hover:opacity-0
                    ${isDark ? "from-plp-maroon via-plp-maroon/80 to-transparent" : "from-white via-white/80 to-transparent"} 
                  `}
                  />
                </div>

                <div className="pt-4 border-t border-current opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <Label className="text-[9px] tracking-widest">
                    Request Archive Access —&gt;
                  </Label>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
