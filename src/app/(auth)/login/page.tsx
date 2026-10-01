import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { RedirectIfAuthenticated } from "@/components/features/auth/RedirectIfAuthenticated";
import AuthForm from "@/components/features/auth/AuthForm";

export const metadata: Metadata = {
  title: "Login | The Preloved Professional",
  description: "Access your Preloved Professional account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-8">
            <Loader2 size={24} className="animate-spin text-plp-maroon" />
          </div>
        }
      >
        <RedirectIfAuthenticated>
          <AuthForm />
        </RedirectIfAuthenticated>
      </Suspense>
    </div>
  );
}