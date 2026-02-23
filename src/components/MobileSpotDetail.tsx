"use client";

import { ArrowLeft } from "lucide-react";
import { useMapStore } from "@/store/useMapStore";
import { SpotDetailContent } from "@/components/SpotDetailPanel";

/** Mobile spot detail — embedded inside MobileDrawer (no panel chrome) */
export function MobileSpotDetail() {
  const selectedSpot = useMapStore((s) => s.selectedSpot);
  const selectSpot = useMapStore((s) => s.selectSpot);

  if (!selectedSpot) return null;

  return (
    <div className="flex h-full flex-col">
      {/* Back arrow */}
      <button
        onClick={() => selectSpot(null)}
        className="flex shrink-0 items-center gap-2 px-3 py-2 text-xs text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Reuse shared content */}
      <SpotDetailContent
        key={selectedSpot.id}
        spot={selectedSpot}
        onClose={() => selectSpot(null)}
      />
    </div>
  );
}
