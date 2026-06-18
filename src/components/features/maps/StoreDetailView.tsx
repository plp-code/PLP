import { ChevronLeft, MapPin, Navigation, Clock, DollarSign, Info } from "lucide-react";
import { getTodayHours } from "@/lib/utils";

export function StoreDetailView({ store, onBack }: any) {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-white animate-in slide-in-from-right-4 duration-300 pb-24 md:pb-0">
      
      {/* Sticky Header - Increased touch target size for the Back Button on mobile */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 p-2 md:p-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 md:gap-2 text-[14px] md:text-sm font-semibold text-gray-600 active:text-blue-600 hover:text-blue-600 px-3 py-2 md:py-1.5 rounded-lg active:bg-blue-50 hover:bg-blue-50 transition-colors"
        >
          <ChevronLeft size={18} className="md:w-4 md:h-4" /> 
          Back to results
        </button>
      </div>

      {/* Hero Image Area - slightly taller on mobile so it doesn't feel squished */}
      <div className="h-40 md:h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-center justify-center shrink-0">
        <MapPin size={28} className="text-gray-400 opacity-50" />
      </div>

      <div className="p-5 md:p-6 flex flex-col gap-6 md:gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1.5 md:mb-2 leading-tight">
            {store.store_name}
          </h2>
          <p className="text-gray-500 text-[14px] md:text-sm mb-5">
            {store.address}
          </p>
          
          {/* Directions Button - Added 'w-full' so it stretches edge-to-edge on phones */}
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(store.store_name + " " + (store.address || ""))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 md:py-3 bg-blue-600 text-white text-[14px] md:text-sm font-bold rounded-xl shadow-sm active:scale-[0.98] active:bg-blue-700 transition-all"
          >
            <Navigation size={18} className="md:w-4 md:h-4" /> 
            Directions
          </a>
        </div>
        
        <hr className="border-gray-100" />
        
        {/* Info Sections - Adjusted padding and text sizes for mobile legibility */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-3.5 md:gap-4">
            <div className="bg-blue-50 p-2.5 md:p-2 rounded-full h-fit shrink-0">
              <Clock size={18} className="text-blue-600 md:w-4 md:h-4" />
            </div>
            <div className="flex-1">
              <span className="font-bold text-[14px] md:text-sm text-gray-900 block mb-0.5">Hours</span>
              <span className="text-gray-600 text-[14px] md:text-sm">{getTodayHours(store.hours).string}</span>
            </div>
          </div>

          {(store.price_range || store.price_notes) && (
            <div className="flex gap-3.5 md:gap-4">
              <div className="bg-emerald-50 p-2.5 md:p-2 rounded-full h-fit shrink-0">
                <DollarSign size={18} className="text-emerald-600 md:w-4 md:h-4" />
              </div>
              <div className="flex-1">
                <span className="font-bold text-[14px] md:text-sm text-gray-900 block mb-0.5">Pricing</span>
                <span className="text-gray-600 text-[14px] md:text-sm block">Level: {store.price_range || "N/A"}</span>
                {store.price_notes && <span className="text-gray-500 text-[13px] mt-1 block leading-snug">{store.price_notes}</span>}
              </div>
            </div>
          )}

          {store.notes && (
            <div className="flex gap-3.5 md:gap-4">
              <div className="bg-gray-50 p-2.5 md:p-2 rounded-full h-fit shrink-0">
                <Info size={18} className="text-gray-600 md:w-4 md:h-4" />
              </div>
              <div className="flex-1">
                <span className="font-bold text-[14px] md:text-sm text-gray-900 block mb-1">About</span>
                <p className="text-gray-600 text-[14px] md:text-sm leading-relaxed">{store.notes}</p>
              </div>
            </div>
          )}
        </div>        
      </div>
    </div>
  );
}