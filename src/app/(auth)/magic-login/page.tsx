import { Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { RedirectIfAuthenticated } from "@/components/features/auth/RedirectIfAuthenticated";
import { MagicLoginView } from "@/components/features/auth/MagicLoginView";

export default function MagicLoginPage() {
  return (
    <Suspense fallback={<Spinner text="Signing you in" />}>
      <RedirectIfAuthenticated>
        <MagicLoginView />
      </RedirectIfAuthenticated>
    </Suspense>
  );
}
