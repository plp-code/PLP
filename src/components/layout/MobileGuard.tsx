import { Monitor } from "lucide-react";
import { Display, Manifesto, Label } from "../common/Typography";

export default function MobileGuard() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-plp-maroon p-10 text-center text-plp-parchment md:hidden">
      <Monitor className="mb-6 h-12 w-12 text-plp-lime" />

      <Display className="mb-4 text-4xl leading-tight tracking-wide">
        The PLP is <br /> for desktops.
      </Display>

      <Manifesto className="max-w-xs text-md opacity-80">
        We&apos;re in the process of designing a mobile experience, but for now,
        please visit us on a desktop or laptop to explore the full site.
      </Manifesto>

      <div className="mt-12 h-px w-24 bg-plp-lime/30" />

      <Label className="mt-4 text-[10px] opacity-40">
        Est. 2026 / New York / London
      </Label>
    </div>
  );
}
