"use client";

import { useMemo } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Spot } from "@/lib/types";
import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";
import { timeAgo } from "@/lib/timeAgo";

interface ActivityFeedProps {
  spots: Spot[];
}

export function ActivityFeed({ spots }: ActivityFeedProps) {
  const selectSpot = useMapStore((s) => s.selectSpot);
  const flyTo = useMapStore((s) => s.flyTo);
  const { t, locale } = useTranslation();

  const recentSpots = useMemo(
    () =>
      [...spots]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
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

  return (
    <div className="glass-card rounded-2xl p-4">
      <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {t("activity.title")}
      </h3>

      {recentSpots.length === 0 ? (
        <p className="mt-3 text-xs text-text-tertiary">{t("recentFinds.empty")}</p>
      ) : (
        <div className="mt-3 space-y-1">
          {recentSpots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => handleClick(spot)}
              className="group flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left transition-all duration-200 hover:bg-black/[0.04]"
            >
              {/* Avatar */}
              {spot.author.avatar_url ? (
                <Image
                  src={spot.author.avatar_url}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 shrink-0 rounded-full"
                  unoptimized
                />
              ) : (
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-400/20 text-[9px] text-pink-400">
                  {(spot.author.display_name ?? "?")[0]}
                </div>
              )}

              {/* Text */}
              <p className="min-w-0 flex-1 truncate text-[11px] text-text-body">
                <span className="font-medium text-text-primary">
                  {spot.author.display_name ?? t("spot.anonymous")}
                </span>
                {" "}{t("activity.addedSpot")}{" "}
                <span className="font-medium text-text-primary">{spot.title}</span>
                <span className="text-text-tertiary">
                  {" "}· {timeAgo(spot.created_at, locale)}
                </span>
              </p>

              {/* Fly-to hint */}
              <MapPin className="h-3 w-3 shrink-0 text-text-tertiary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
