import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ResetPasswordForm } from "@/components/features/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="plp-window p-1">
      <div className="plp-titlebar h-9 md:h-8 flex items-center justify-between px-3 md:px-2">
        <h2 className="font-bold text-[13px] md:text-sm capitalize tracking-tight">
          Reset Password
        </h2>
      </div>

      <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-5 sm:pb-6">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-8">
              <Loader2 size={24} className="animate-spin text-plp-maroon" />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}