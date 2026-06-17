import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/context/AuthContext";
import { api } from "@/lib/api";

export interface MapItem {
  id: number;
  title: string;
  slug: string;
  description?: string;
  region?: string;
  map_price: number;
  has_access: boolean;
}

export function useMapCheckout() {
  const router = useRouter();
  const { isAuthenticated } = useAuthUser();
  const [checkoutLoadingId, setCheckoutLoadingId] = useState<number | null>(
    null,
  );

  const handleMapAction = async (map: MapItem) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (map.has_access) {
      router.push(`/maps/${map.slug}`);
      return;
    }

    try {
      setCheckoutLoadingId(map.id);

      const response = await api.post<{ url: string }>(
        "/api/checkout/create-session",
        {
          map_id: map.id,
        },
      );

      if (response.url) {
        window.location.href = response.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Failed to initiate checkout:", err);

      alert("Unable to start checkout. Please try again.");
    } finally {
      setCheckoutLoadingId(null);
    }
  };

  return { handleMapAction, checkoutLoadingId };
}
