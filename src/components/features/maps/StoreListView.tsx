import { ChevronRight, Loader2 } from "lucide-react";
import { getTodayHours } from "@/lib/utils";

export function StoreListView({ stores, onSelect, hasMore, loadingMore, observerRef, isSearching, activeId, className = "" }: any) {
  console.log("Rendering StoreListView with stores:", stores);
  console.log(stores.length);
  return (
    <div className={`flex-1 overflow-y-auto flex flex-col ${className}`}>
      <div className="p-3 md:p-4 border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
        <h2 className="text-[13px] md:text-sm font-semibold text-gray-500 uppercase tracking-wider">
          {stores.length} Locations Found
        </h2>
      </div>

      <div className="divide-y divide-gray-100 pb-16 md:pb-0"> 
        {stores.map((store: any) => {
          const timeData = getTodayHours(store.hours);
          const isSelected = store.id === activeId;

          return (
            <div
              key={store.id}
              onClick={() => onSelect(store.id)}
              className={`group relative p-4 md:p-6 min-h-[90px] md:min-h-[110px] cursor-pointer transition-colors flex justify-between items-center ${
                isSelected ? "bg-blue-50/50" : "bg-white hover:bg-gray-50"
              }`}
            >
              {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600" />}

              <div className="pr-3 md:pr-4 min-w-0 flex flex-col justify-center gap-1 md:gap-1.5">
                <h3 className={`font-semibold text-[15px] md:text-base truncate ${isSelected ? "text-blue-700" : "text-gray-900"}`}>
                  {store.store_name}
                </h3>
                <p className="text-[13px] md:text-sm text-gray-500 truncate">{store.address}</p>
              </div>

              <div className="flex flex-col items-end justify-center gap-1.5 md:gap-2 shrink-0">
                <div className={`flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-wider ${timeData.isOpen ? "text-emerald-600" : "text-gray-400"}`}>
                  <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${timeData.isOpen ? "bg-emerald-500" : "bg-gray-400"}`} />
                  {timeData.isOpen ? "Open" : "Closed"}
                </div>
                <ChevronRight size={16} className={`${isSelected ? "text-blue-500" : "text-gray-300"}`} />
              </div>
            </div>
          );
        })}

        {!isSearching && (
          <div ref={observerRef} className="py-8 flex justify-center">
            {loadingMore ? <Loader2 className="animate-spin text-gray-400" /> : (!hasMore && <span className="text-sm text-gray-400 font-medium">End of results</span>)}
          </div>
        )}
      </div>
    </div>
  );
}