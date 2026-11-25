"use client";

import { AlertTriangle, Clock, LogIn, MailCheck, Undo2 } from "lucide-react";
import {
  useCheckoutComplete,
  useResendClaim,
} from "@/hooks/useCheckoutComplete";
import { Spinner } from "@/components/ui/Spinner";
import { buildLoginRedirect } from "@/lib/returnTo";
import { StatusCard } from "@/components/ui/StatusCard";

function RequiresLoginCard({
  emailHint,
  sessionId,
  loginHref,
}: {
  emailHint: string | null;
  sessionId: string | null;
  loginHref: string;
}) {
  const { resend, isSending, sent, error, cooldown } =
    useResendClaim(sessionId);

  return (
    <StatusCard
      title="Payment Received"
      icon={MailCheck}
      message={`Payment received. We sent a link to ${emailHint ?? "your email"} to access your map.`}
      secondary={{ href: loginHref, label: "or log in" }}
    >
      <button
        type="button"
        onClick={resend}
        disabled={isSending || cooldown > 0}
        className="plp-btn-primary cursor-pointer flex items-center justify-center min-h-11 px-4 w-full font-bodoni font-bold text-sm capitalize tracking-tighter disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSending
          ? "Sending..."
          : cooldown > 0
            ? `Resend link (${cooldown}s)`
            : "Resend link"}
      </button>
      {(sent || error) && (
        <p
          role="status"
          className="mt-3 text-[11px] sm:text-xs font-bold text-plp-maroon/80 text-balance"
        >
          {error ?? "If an account needs it, we've sent a new link."}
        </p>
      )}
    </StatusCard>
  );
}

export function CheckoutCompleteView() {
  const { viewState, mapSlug, emailHint, sessionId } = useCheckoutComplete();
  const loginHref = buildLoginRedirect(mapSlug ? `/maps/${mapSlug}` : "/maps");

  if (viewState === "polling" || viewState === "success") {
    return <Spinner text="Finalizing your purchase" />;
  }

  if (viewState === "requires_login") {
    return (
      <RequiresLoginCard
        emailHint={emailHint}
        sessionId={sessionId}
        loginHref={loginHref}
      />
    );
  }

  if (viewState === "already_owned") {
    return (
      <StatusCard
        title="Already Owned"
        icon={LogIn}
        message="You already own this map."
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
        message="If you were charged, check your email or contact support."
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
