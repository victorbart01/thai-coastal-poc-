"use client";

import { useMapStore } from "@/store/useMapStore";
import { SpotDetailContent } from "@/components/SpotDetailPanel";

/** Mobile spot detail — embedded inside MobileDrawer (no panel chrome) */
export function MobileSpotDetail() {
  const selectedSpot = useMapStore((s) => s.selectedSpot);
  const selectSpot = useMapStore((s) => s.selectSpot);

  if (!selectedSpot) return null;

  return (
    <SpotDetailContent
      key={selectedSpot.id}
      spot={selectedSpot}
      onClose={() => selectSpot(null)}
    />
  );
}
