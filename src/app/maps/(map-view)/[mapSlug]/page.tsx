"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { use } from "react";
import dynamic from "next/dynamic";
import { useAuthUser } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/Spinner";

const StoreDashboard = dynamic(
  () => import("@/components/features/maps/StoreDashboard"),
  { ssr: false }
);

export default function Page({ params }: { params: Promise<{ mapSlug: string }> }) {
  const { mapSlug } = use(params);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuthUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?returnTo=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, pathname, router, user]);

  if (isLoading) {
    return (
      <Spinner text="Checking access" />
    );
  }

  if (!user) {
    return null;
  }

  return <StoreDashboard mapSlug={mapSlug} />;
}