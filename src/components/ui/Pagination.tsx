import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const arrowClass =
  "group flex h-10 w-10 items-center justify-center text-plp-maroon/45 transition-colors hover:text-plp-maroon disabled:cursor-not-allowed disabled:opacity-20";

export function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="mt-8 flex items-center justify-between border-t border-plp-maroon/15 pt-6 sm:mt-10">
      <p className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-plp-maroon/40 sm:block">
        Showing {start}-{end} of {total}
      </p>

      <nav
        className="flex w-full items-center justify-between gap-1 sm:w-auto sm:justify-end"
        aria-label="Pagination"
      >
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className={arrowClass}
        >
          <ChevronLeft
            className="h-5 w-5 transition-transform group-hover:-translate-x-0.5"
            strokeWidth={1.5}
          />
        </button>

        <span className="font-mono text-[12px] tracking-[0.14em] text-plp-maroon/40 sm:hidden">
          {String(page).padStart(2, "0")}
          <span className="mx-1.5 text-plp-maroon/20">/</span>
          {String(totalPages).padStart(2, "0")}
        </span>

        <div className="hidden items-center sm:flex">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onPageChange(n)}
              aria-current={page === n ? "page" : undefined}
              className={`flex h-10 min-w-10 items-center justify-center px-2 font-mono text-[13px] transition-colors ${
                page === n
                  ? "text-plp-maroon underline decoration-plp-maroon underline-offset-4"
                  : "text-plp-maroon/35 hover:text-plp-maroon"
              }`}
            >
              {String(n).padStart(2, "0")}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className={arrowClass}
        >
          <ChevronRight
            className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        </button>
      </nav>
    </div>
  );
}
