import { useCallback, useEffect, useRef } from "react";

function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let el = node?.parentElement ?? null;
  while (el) {
    const { overflowY } = getComputedStyle(el);
    if (/(auto|scroll|overlay)/.test(overflowY)) return el;
    el = el.parentElement;
  }
  return null;
}

export function useInfiniteScroll(
  onLoadMore: () => void,
  {
    hasMore,
    loading,
    disabled = false,
  }: { hasMore: boolean; loading: boolean; disabled?: boolean },
) {
  const observer = useRef<IntersectionObserver | null>(null);

  const latest = useRef({ onLoadMore, hasMore, loading, disabled });
  useEffect(() => {
    latest.current = { onLoadMore, hasMore, loading, disabled };
  });

  const sentinel = useRef<HTMLDivElement | null>(null);

  const connect = useCallback(() => {
    observer.current?.disconnect();
    observer.current = null;
    const node = sentinel.current;
    if (!node) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        const { onLoadMore, hasMore, loading, disabled } = latest.current;
        if (
          entries.some((e) => e.isIntersecting) &&
          hasMore &&
          !loading &&
          !disabled
        ) {
          onLoadMore();
        }
      },
      {
        root: getScrollParent(node),
        rootMargin: "0px 0px 300px 0px",
        threshold: 0,
      },
    );
    observer.current.observe(node);
  }, []);

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      sentinel.current = node;
      connect();
    },
    [connect],
  );

  useEffect(() => {
    connect();
  }, [connect, hasMore, loading, disabled]);

  useEffect(() => () => observer.current?.disconnect(), []);

  return ref;
}
