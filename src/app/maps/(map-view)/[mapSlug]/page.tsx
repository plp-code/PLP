"use client";
import { use } from 'react';
import dynamic from 'next/dynamic';

const StoreDashboard = dynamic(
  () => import('@/components/features/maps/StoreDashboard'), 
  { ssr: false }
);

export default function Page({ params }: { params: Promise<{ mapSlug: string }> }) {
  const { mapSlug } = use(params);
  return <StoreDashboard mapSlug={mapSlug} />;
}