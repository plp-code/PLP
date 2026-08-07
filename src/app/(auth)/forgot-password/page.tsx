import { ForgotPasswordForm } from "@/components/features/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="plp-window p-1">
      <div className="plp-titlebar h-9 md:h-8 flex items-center justify-between px-3 md:px-2">
        <h2 className="font-bold text-[13px] md:text-sm capitalize tracking-tight">
          Forgot Password
        </h2>
      </div>
      <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-5 sm:pb-6">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}