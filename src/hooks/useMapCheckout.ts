import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthUser } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { MapItem } from "@/types";

export function useMapCheckout() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthUser();
  const [checkoutLoadingId, setCheckoutLoadingId] = useState<number | null>(null);

  const handleMapAction = async (map: MapItem) => {
    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }

    if (map.has_access) {
      router.push(`/maps/${map.slug}`);
      return;
    }

    try {
      setCheckoutLoadingId(map.id);
      const response = await api.post<{ url: string }>("/api/checkout/create-session", {
        map_id: map.id,
      });
      if (response.url) window.location.href = response.url; // Go to Stripe
    } catch (err) {
      alert("Unable to start checkout. Please try again.");
    } finally {
      setCheckoutLoadingId(null);
    }
  };

  return { handleMapAction, checkoutLoadingId };
}