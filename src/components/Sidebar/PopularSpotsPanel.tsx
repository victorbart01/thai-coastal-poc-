"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { Spot } from "@/lib/types";
import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";

interface PopularSpotsPanelProps {
  spots: Spot[];
}

export function PopularSpotsPanel({ spots }: PopularSpotsPanelProps) {
  const selectSpot = useMapStore((s) => s.selectSpot);
  const flyTo = useMapStore((s) => s.flyTo);
  const { t } = useTranslation();

  const popularSpots = useMemo(
    () =>
      [...spots]
        .sort((a, b) => (b.like_count ?? 0) - (a.like_count ?? 0))
        .slice(0, 10),
    [spots]
  );

  const handleClick = (spot: Spot) => {
    selectSpot(spot);
    flyTo({
      latitude: spot.latitude,
      longitude: spot.longitude,
      zoom: 14,
    });
  };

  if (popularSpots.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-4">
      <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {t("popularSpots.title")}
      </h3>

      <div className="mt-3 flex snap-x gap-2.5 overflow-x-auto pb-1">
        {popularSpots.map((spot) => {
          const thumbnail = spot.photos[0]?.url;

          return (
            <button
              key={spot.id}
              onClick={() => handleClick(spot)}
              className="group min-w-[200px] shrink-0 snap-start overflow-hidden rounded-2xl border border-transparent bg-black/[0.03] text-left transition-all duration-200 hover:border-black/[0.08] hover:bg-black/[0.06]"
            >
              {/* Thumbnail */}
              {thumbnail && (
                <div className="relative h-24 w-full overflow-hidden">
                  <Image
                    src={thumbnail}
                    alt={spot.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                </div>
              )}

              <div className="p-2.5">
                <p className="truncate text-xs font-medium text-text-primary">
                  {spot.title}
                </p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-text-tertiary">
                  <Heart className="h-3 w-3" />
                  <span>{spot.like_count ?? 0}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
