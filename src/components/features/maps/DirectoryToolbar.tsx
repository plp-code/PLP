import { Search, X, List, LayoutGrid, Signpost } from "lucide-react";

interface DirectoryToolbarProps {
  totalCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function DirectoryToolbar({
  totalCount,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: DirectoryToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5">
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-plp-maroon/10">
          <Signpost size={18} className="text-plp-maroon" />
        </div>
        <p className="text-sm sm:text-base text-gray-500 font-medium">
          Explore <span className="text-gray-900 font-bold">{totalCount}</span>{" "}
          curated location and route
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="relative flex-1 sm:w-72 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-plp-maroon text-gray-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search maps..."
            className="block w-full pl-9 pr-9 py-2 sm:py-2 font-bodoni tracking-wide bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-plp-maroon/15 focus:border-plp-maroon/30 focus:bg-white shadow-sm transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="hidden sm:flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200">
          <button
            onClick={() => onViewModeChange("list")}
            aria-label="List View"
            className={`p-1.5 rounded-lg transition-all duration-200 flex items-center justify-center ${
              viewMode === "list"
                ? "bg-white text-plp-maroon shadow-sm ring-1 ring-gray-200"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => onViewModeChange("grid")}
            aria-label="Grid View"
            className={`p-1.5 rounded-lg transition-all duration-200 flex items-center justify-center ${
              viewMode === "grid"
                ? "bg-white text-plp-maroon shadow-sm ring-1 ring-gray-200"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
