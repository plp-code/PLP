import { Search, X, List, LayoutGrid, Signpost, Filter, ChevronDown } from "lucide-react";
import { MapStatus } from "@/types";

interface DirectoryToolbarProps {
  totalCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  statusFilter: MapStatus | "all";
  onFilterChange: (status: MapStatus | "all") => void;
  isFetching?: boolean;
}

export function DirectoryToolbar({
  totalCount,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  statusFilter,
  onFilterChange,
  isFetching,
}: DirectoryToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5">
      <div className="flex items-center justify-between lg:justify-start gap-3">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-plp-maroon/10">
            <Signpost size={18} className="text-plp-maroon" />
          </div>
          <p className="text-sm sm:text-base text-gray-500 font-medium flex items-center gap-2">
            Explore <span className="text-gray-900 font-bold">{totalCount}</span> curated maps
            {isFetching && (
              <span className="flex h-2 w-2 rounded-full bg-plp-maroon animate-pulse" title="Updating..." />
            )}
          </p>
        </div>
      </div>

      {/* Right side: Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
        
        {/* Search Bar */}
        <div className="relative flex-1 sm:w-64 group">
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

        <div className="flex items-center gap-2.5">
          {/* Status Filter Dropdown */}
          <div className="relative flex-1 sm:flex-none sm:w-44 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-plp-maroon transition-colors">
              <Filter size={14} />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => onFilterChange(e.target.value as MapStatus | "all")}
              className="block w-full pl-8 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-plp-maroon/15 focus:border-plp-maroon/30 focus:bg-white transition-all cursor-pointer appearance-none shadow-sm"
            >
              <option value="all">All Maps</option>
              <option value="live">Live Only</option>
              <option value="waitlist">Coming Soon</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <ChevronDown size={14} />
            </div>
          </div>

          {/* View Toggles */}
          <div className="hidden sm:flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200 shrink-0">
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
    </div>
  );
}