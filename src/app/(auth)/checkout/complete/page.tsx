import { Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { CheckoutCompleteView } from "@/components/features/checkout/CheckoutCompleteView";

export default function CheckoutCompletePage() {
  return (
    <Suspense fallback={<Spinner text="Finalizing your purchase" />}>
      <CheckoutCompleteView />
    </Suspense>
  );
}
