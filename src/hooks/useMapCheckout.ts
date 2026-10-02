import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthUser } from "@/context/AuthContext";
import { useSnackbar } from "@/context/SnackbarContext";
import { api } from "@/lib/api";
import { MapItem } from "@/types";
import type { CheckoutSessionResponse } from "@/types/api";

const STRIPE_CHECKOUT_HOST = "checkout.stripe.com";

function isValidStripeUrl(url?: string): url is string {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === STRIPE_CHECKOUT_HOST;
  } catch {
    return false;
  }
}

export function useMapCheckout() {
  const [checkoutLoadingId, setCheckoutLoadingId] = useState<number | null>(
    null,
  );
  const { isLoading } = useAuthUser();
  const router = useRouter();
  const snackbar = useSnackbar();

  const handleMapAction = async (map: MapItem) => {
    if (isLoading) {
      return;
    }

    if (map.is_purchased) {
      router.push(`/maps/${map.slug}`);
      return;
    }

    setCheckoutLoadingId(map.id);

    try {
      const response = await api.post<CheckoutSessionResponse>(
        `/checkout/create-session?map_slug=${encodeURIComponent(map.slug)}`,
      );

      if (!isValidStripeUrl(response?.checkout_url)) {
        throw new Error("Unexpected checkout URL received");
      }
      window.location.href = response.checkout_url;
    } catch (error) {
      console.error("Checkout failed:", error);
      snackbar.error("Couldn't start checkout", "Please try again.");
    } finally {
      setCheckoutLoadingId(null);
    }
  };

  return { handleMapAction, checkoutLoadingId };
}
