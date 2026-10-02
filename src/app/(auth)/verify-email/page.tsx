import type { Metadata } from "next";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { VerifyEmailView } from "@/components/features/auth/VerifyEmailView";

export const metadata: Metadata = {
  title: "Verify Email | The Preloved Professional",
  robots: { index: false, follow: false },
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Spinner text="Verifying your email" />}>
      <VerifyEmailView />
    </Suspense>
  );
}
