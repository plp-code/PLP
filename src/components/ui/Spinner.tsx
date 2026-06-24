import { MapIcon } from "lucide-react";

export const Spinner = ({text}: {text?: string}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-plp-maroon rounded-full border-t-transparent animate-spin"></div>
          <MapIcon size={20} className="text-plp-maroon animate-pulse" />
        </div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest animate-pulse">
          {text}
        </p>
      </div>
  );
}