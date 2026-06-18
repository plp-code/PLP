import { useState } from "react";
import { api } from "@/lib/api";
import { MapItem } from "@/types";

export function useMapCheckout() {
  const [checkoutLoadingId, setCheckoutLoadingId] = useState<number | null>(
    null,
  );

  const handleMapAction = async (map: MapItem) => {
    if (map.has_access) {
      window.location.href = `/maps/${map.slug}`;
      return;
    }

    setCheckoutLoadingId(map.id);

    try {
      const response = await api.post("/checkout/create-session", {
        map_id: map.id,
      });

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
