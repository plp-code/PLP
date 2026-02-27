import Link from "next/link";
import { Label, Display } from "@/components/common/Typography";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-plp-parchment p-6 text-center">
      <Label className="mb-4 opacity-50 uppercase tracking-widest">
        Error 404
      </Label>

      <Display className="mb-8 text-6xl md:text-8xl lowercase">
        path not found
      </Display>

      <p className="mb-12 max-w-md text-sm uppercase tracking-tight opacity-70 italic">
        The requested resource does not exist within the current archive
        parameters. It may have been moved, deleted, or never existed.
      </p>

      <Link
        href="/"
        className="group flex items-center gap-2 border-b-2 border-plp-maroon pb-1 hover:border-plp-lime transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <Label className="text-xs">Return Back Home</Label>
      </Link>
    </div>
  );
}
