"use client";

import { useState } from "react";
import { LayoutGrid, List, ArrowDownToLine } from "lucide-react";
import { Label } from "@/components/ui/Typography";

const MAP_DATA = [
  {
    id: "01",
    title: "map title",
    description: "something here",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    id: "02",
    title: "map title",
    description: "something here",
    size: "1.8 MB",
    format: "PDF",
  },
  {
    id: "03",
    title: "map title",
    description: "something here",
    size: "3.2 MB",
    format: "PDF",
  },
  {
    id: "04",
    title: "map title",
    description: "something here",
    size: "1.5 MB",
    format: "PDF",
  }
];

export default function MapDirectory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="w-full">
      <div className="flex items-end justify-between pb-4 ">
        <Label className="text-xs tracking-[0.2em] uppercase text-plp-maroon/60">
          Available Downloads ({MAP_DATA.length})
        </Label>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 transition-colors ${viewMode === "grid" ? "text-plp-maroon" : "text-plp-maroon/30 hover:text-plp-maroon/60"}`}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 transition-colors ${viewMode === "list" ? "text-plp-maroon" : "text-plp-maroon/30 hover:text-plp-maroon/60"}`}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MAP_DATA.map((map) => (
            <div
              key={map.id}
              className="group flex flex-col justify-between border border-plp-maroon/20 p-8 bg-transparent hover:bg-white/40 transition-colors duration-500"
            >
              <div className="space-y-4 mb-12">
                <Label className="text-[10px] tracking-widest text-plp-maroon/50">
                  {map.id}
                </Label>
                <h3 className="text-2xl md:text-3xl font-serif text-plp-maroon leading-tight">
                  {map.title}
                </h3>
                <p className="text-plp-maroon/70 font-light text-sm md:text-base leading-relaxed">
                  {map.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-plp-maroon/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-plp-maroon/60">
                  {map.format} — {map.size}
                </span>
                <button className="flex items-center gap-2 text-plp-maroon hover:text-plp-lime hover:bg-plp-maroon px-4 py-2 border border-plp-maroon transition-all duration-300">
                  <Label className="text-[9px] uppercase tracking-widest">Download</Label>
                  <ArrowDownToLine size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col border-t border-plp-maroon/20">
          {MAP_DATA.map((map) => (
            <div
              key={map.id}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b border-plp-maroon/20 hover:bg-white/40 px-4 transition-colors duration-500"
            >
              <div className="flex items-start md:items-center gap-6 md:gap-12 flex-1">
                <Label className="text-[10px] tracking-widest text-plp-maroon/50 min-w-[40px]">
                  {map.id}
                </Label>
                <div className="space-y-1">
                  <h3 className="text-xl font-serif text-plp-maroon">
                    {map.title}
                  </h3>
                  <p className="text-plp-maroon/70 font-light text-sm hidden md:block">
                    {map.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
                <span className="font-mono text-[10px] uppercase tracking-widest text-plp-maroon/60">
                  {map.format} / {map.size}
                </span>
                <button className="flex items-center justify-center w-10 h-10 border border-plp-maroon text-plp-maroon hover:text-plp-lime hover:bg-plp-maroon transition-all duration-300">
                  <ArrowDownToLine size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
