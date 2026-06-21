import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthUser } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { MapItem } from "@/types";

export function useMapCheckout() {
  const [checkoutLoadingId, setCheckoutLoadingId] = useState<number | null>(
    null,
  );
  const { isAuthenticated, isLoading } = useAuthUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleMapAction = async (map: MapItem) => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
      return;
    }

    if (map.is_purchased) {
      router.push(`/maps/${map.slug}`);
      return;
    }

    setCheckoutLoadingId(map.id);

    try {
      const response = await api.post(
        `/checkout/create-session?map_slug=${encodeURIComponent(map.slug)}`,
      );

      if (response && response.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Unable to start checkout. Please try again.");
    } finally {
      setCheckoutLoadingId(null);
    }
  };

  return { handleMapAction, checkoutLoadingId };
}
