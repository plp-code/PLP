"use client";

import { AlertTriangle, Clock, LogIn } from "lucide-react";
import { useCheckoutComplete } from "@/hooks/useCheckoutComplete";
import { Spinner } from "@/components/ui/Spinner";
import { buildLoginRedirect } from "@/lib/returnTo";
import { StatusCard } from "@/components/ui/StatusCard";

export function CheckoutCompleteView() {
  const { viewState, mapSlug } = useCheckoutComplete();

  if (viewState === "polling" || viewState === "success") {
    return <Spinner text="Finalizing your purchase" />;
  }

  if (viewState === "requires_login" || viewState === "already_owned") {
    const loginHref = buildLoginRedirect(
      mapSlug ? `/maps/${mapSlug}` : "/maps",
    );
    return (
      <StatusCard
        title={
          viewState === "requires_login" ? "Payment Received" : "Already Owned"
        }
        icon={LogIn}
        message={
          viewState === "requires_login"
            ? "Payment received. Log in to view your map."
            : "You already own this map. We refunded this duplicate charge. Log in to view it."
        }
        href={loginHref}
        cta="Log In"
      />
    );
  }

  if (viewState === "timeout") {
    return (
      <StatusCard
        title="Still Processing"
        icon={Clock}
        message="This is taking longer than expected — check your email, we'll notify you when it's ready."
        href="/maps"
        cta="Browse Maps"
      />
    );
  }

  return (
    <StatusCard
      title="Checkout Issue"
      icon={AlertTriangle}
      message={
        viewState === "missing"
          ? "We couldn't find your checkout session."
          : "Your checkout session has expired or the payment failed."
      }
      href="/maps"
      cta="Return to Map Listing"
    />
  );
}
