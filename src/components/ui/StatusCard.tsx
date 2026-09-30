import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  message: string;
  icon: LucideIcon;
  href: string;
  cta: string;
}

export function StatusCard({
  title,
  message,
  icon: Icon,
  href,
  cta,
}: StatusCardProps) {
  return (
    <div className="plp-window p-1 w-full">
      <div className="plp-titlebar h-10 md:h-8 flex items-center px-3 md:px-2">
        <h2 className="font-bold text-sm capitalize tracking-tight truncate">
          {title}
        </h2>
      </div>
      <div className="px-4 sm:px-6 py-6 flex flex-col items-center text-center">
        <Icon size={40} className="text-plp-maroon mb-4" aria-hidden />
        <p className="text-plp-maroon/80 text-xs sm:text-sm leading-relaxed mb-6 text-balance break-words">
          {message}
        </p>
        <Link
          href={href}
          className="plp-btn-primary flex items-center justify-center min-h-11 px-4 w-full font-bodoni font-bold text-sm capitalize tracking-tighter"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
