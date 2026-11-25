"use client";

import { AlertTriangle, Clock, LogIn, Undo2 } from "lucide-react";
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
        secondary={{
          href: `${loginHref}&method=magic-link`,
          label: "or get a magic link",
        }}
      />
    );
  }

  if (viewState === "refunded") {
    return (
      <StatusCard
        title="Payment Refunded"
        icon={Undo2}
        message="This payment was refunded. Contact us if that's unexpected."
        href="/maps"
        cta="Browse Maps"
      />
    );
  }

  if (viewState === "timeout") {
    return (
      <StatusCard
        title="Still Processing"
        icon={Clock}
        message="We're still confirming your payment. If you were charged, contact support and we'll sort it out."
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
