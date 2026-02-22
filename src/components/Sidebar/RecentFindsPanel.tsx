"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import type { Spot } from "@/lib/types";
import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";
import { timeAgo } from "@/lib/timeAgo";

interface RecentFindsPanelProps {
  spots: Spot[];
}

export function RecentFindsPanel({ spots }: RecentFindsPanelProps) {
  const selectSpot = useMapStore((s) => s.selectSpot);
  const flyTo = useMapStore((s) => s.flyTo);
  const selectedSpot = useMapStore((s) => s.selectedSpot);
  const { t, locale } = useTranslation();

  const recentSpots = useMemo(
    () =>
      [...spots]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 8),
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

  return (
    <div className="rounded-lg border border-white/[0.06] bg-ocean-700 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {t("recentFinds.title")}
      </h3>

      {recentSpots.length === 0 ? (
        <p className="mt-3 text-xs text-text-tertiary">{t("recentFinds.empty")}</p>
      ) : (
        <div className="mt-3 space-y-2">
          {recentSpots.map((spot) => {
            const isSelected = selectedSpot?.id === spot.id;
            const thumbnail = spot.photos[0]?.url;

            return (
              <button
                key={spot.id}
                onClick={() => handleClick(spot)}
                className={`group w-full rounded-lg border p-2.5 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-pink-400/30 bg-ocean-600 shadow-[0_0_12px_rgba(244,114,182,0.08)]"
                    : "border-transparent bg-ocean-900/50 hover:border-white/[0.08] hover:bg-ocean-600/50"
                }`}
              >
                <div className="flex gap-2.5">
                  {/* Thumbnail */}
                  {thumbnail && (
                    <Image
                      src={thumbnail}
                      alt={spot.title}
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-md object-cover"
                      unoptimized
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    {/* Title */}
                    <p className="truncate text-xs font-medium text-text-primary">
                      {spot.title}
                    </p>

                    {/* Author + time */}
                    <p className="mt-0.5 truncate text-[10px] text-text-tertiary">
                      {spot.author.display_name ?? t("spot.anonymous")} ·{" "}
                      {timeAgo(spot.created_at, locale)}
                    </p>

                    {/* Like count + fly-to hint */}
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] text-text-tertiary">
                        <Heart className="h-3 w-3" />
                        <span>{spot.like_count ?? 0}</span>
                      </div>
                      <MapPin className="h-3 w-3 text-text-tertiary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
