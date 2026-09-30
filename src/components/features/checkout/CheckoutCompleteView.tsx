"use client";

import { AlertTriangle, Clock, Mail } from "lucide-react";
import { useCheckoutComplete } from "@/hooks/useCheckoutComplete";
import { Spinner } from "@/components/ui/Spinner";
import { StatusCard } from "@/components/ui/StatusCard";

export function CheckoutCompleteView() {
  const { viewState } = useCheckoutComplete();

  if (viewState === "polling" || viewState === "success") {
    return <Spinner text="Finalizing your purchase" />;
  }

  if (viewState === "verify_email") {
    return (
      <StatusCard
        title="Check Your Email"
        icon={Mail}
        message="Thanks for your purchase! Check your email to access your map."
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
