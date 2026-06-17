"use client";
import { use } from 'react';
import dynamic from 'next/dynamic';

const SecureMapDashboard = dynamic(
  () => import('@/components/features/maps/SecureMapDashboard'), 
  { ssr: false }
);

export default function Page({ params }: { params: Promise<{ mapSlug: string }> }) {
  const { mapSlug } = use(params);
  return <SecureMapDashboard mapSlug={mapSlug} />;
}