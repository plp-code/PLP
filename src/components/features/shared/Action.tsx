import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ACTION_CLASS =
  "group inline-flex items-center gap-2.5 border border-plp-maroon px-5 py-3 font-prata text-[11px] font-semibold uppercase tracking-[0.12em] text-plp-maroon transition-colors hover:bg-plp-lime";

export function Action({ href, label }: { href?: string; label: string }) {
  if (!href) {
    return (
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-plp-maroon/45">
        [details soon]
      </span>
    );
  }
  return (
    <Link href={href} className={ACTION_CLASS}>
      {label}
      <ArrowUpRight
        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.5}
      />
    </Link>
  );
}
