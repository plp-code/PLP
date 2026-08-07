import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Handles the post-checkout `?success=true&map=...` redirect: invalidates the
 * maps cache once, surfaces a success toast, and strips the query params from
 * the URL. Returns the toast state and the purchased map name (if present).
 */
export function useCheckoutSuccessToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const hasHandledSuccess = useRef(false);

  const isSuccess = searchParams.get("success") === "true";
  const purchasedMapName = searchParams.get("map");

  useEffect(() => {
    if (isSuccess && !hasHandledSuccess.current) {
      hasHandledSuccess.current = true;
      queryClient.invalidateQueries({ queryKey: ["maps"] });
      setShowSuccessMessage(true);
      router.replace(pathname, { scroll: false });
    }
  }, [isSuccess, queryClient, router, pathname]);

  return { showSuccessMessage, setShowSuccessMessage, purchasedMapName };
}
