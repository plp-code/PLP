import { useCallback, useRef } from "react";

export function useInfiniteScroll(
  onLoadMore: () => void,
  {
    hasMore,
    loading,
    disabled = false,
  }: { hasMore: boolean; loading: boolean; disabled?: boolean },
) {
  const observer = useRef<IntersectionObserver | null>(null);

  return useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !disabled) {
            onLoadMore();
          }
        },
        { threshold: 1.0 },
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, disabled, onLoadMore],
  );
}
