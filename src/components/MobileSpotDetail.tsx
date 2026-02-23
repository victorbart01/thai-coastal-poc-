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
    <div>
      {/* Back arrow — sticky so it remains visible while scrolling */}
      <button
        onClick={() => selectSpot(null)}
        className="sticky top-0 z-10 flex w-full items-center gap-2 bg-[rgba(255,255,255,0.88)] px-3 py-2 text-xs text-text-secondary backdrop-blur-xl transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Reuse shared content — no flex height constraint so the
          MobileDrawer content div handles scrolling */}
      <SpotDetailContent
        key={selectedSpot.id}
        spot={selectedSpot}
        onClose={() => selectSpot(null)}
      />
    </div>
  );
}
