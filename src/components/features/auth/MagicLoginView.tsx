"use client";

import { useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { useMagicLoginVerify } from "@/hooks/useMagicLoginVerify";
import { Spinner } from "@/components/ui/Spinner";
import { StatusCard } from "@/components/ui/StatusCard";

export function MagicLoginView() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { state } = useMagicLoginVerify(token);

  if (state === "verifying" || state === "success") {
    return <Spinner text="Signing you in" />;
  }

  return (
    <StatusCard
      title="Login Link Issue"
      icon={AlertTriangle}
      message="This login link is invalid or has expired. Head back to the login page to request a new one."
      href="/login"
      cta="Go to Login"
    />
  );
}
