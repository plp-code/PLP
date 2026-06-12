import type { Metadata } from "next";
import AuthForm from "@/components/features/login/AuthForm";

export const metadata: Metadata = {
  title: "Login | The Preloved Professional",
  description: "Access your Preloved Professional account.",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
      <AuthForm />      
    </div>
  );
}