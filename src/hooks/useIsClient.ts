import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** false during SSR/hydration, true afterwards — replaces `useEffect(() => setMounted(true), [])`. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
