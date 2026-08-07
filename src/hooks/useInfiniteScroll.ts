import { useCallback, useRef } from "react";

/**
 * Returns a ref callback to attach to the last list item. When that element
 * scrolls into view (and loading isn't in flight / disabled), `onLoadMore`
 * fires. Reattaching to a new node re-arms the observer.
 */
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
