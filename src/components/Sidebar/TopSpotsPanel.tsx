"use client";

import { useMemo } from "react";
import { MapPin } from "lucide-react";
import type { SeaGlassZone } from "@/lib/types";
import { getScoreColor, getCategoryLabelKey, CATEGORY_COLORS } from "@/lib/colors";
import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";

interface TopSpotsPanelProps {
  zones: SeaGlassZone[];
}

export function TopSpotsPanel({ zones }: TopSpotsPanelProps) {
  const selectZone = useMapStore((s) => s.selectZone);
  const flyTo = useMapStore((s) => s.flyTo);
  const selectedZone = useMapStore((s) => s.selectedZone);
  const { t } = useTranslation();

  // Top 6 by score, descending
  const topSpots = useMemo(
    () => [...zones].sort((a, b) => b.score - a.score).slice(0, 6),
    [zones]
  );

  const handleSpotClick = (zone: SeaGlassZone) => {
    selectZone(zone);
    flyTo({
      latitude: zone.coordinates[1],
      longitude: zone.coordinates[0],
      zoom: 11,
    });
  };

  return (
    <div className="rounded-lg border border-white/[0.06] bg-ocean-700 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {t("topSpots.title")}
      </h3>

      <div className="mt-3 space-y-2">
        {topSpots.map((zone, i) => {
          const color = getScoreColor(zone.score);
          const isSelected = selectedZone?.id === zone.id;

          return (
            <button
              key={zone.id}
              onClick={() => handleSpotClick(zone)}
              className={`group w-full rounded-lg border p-3 text-left transition-all duration-200 ${
                isSelected
                  ? "border-glass/30 bg-ocean-600 shadow-[0_0_12px_rgba(56,189,248,0.08)]"
                  : "border-transparent bg-ocean-900/50 hover:border-white/[0.08] hover:bg-ocean-600/50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {/* Rank */}
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-[10px] font-bold"
                  style={{
                    backgroundColor: `${color}15`,
                    color,
                  }}
                >
                  {i + 1}
                </span>

                {/* Name */}
                <span className="flex-1 truncate text-xs font-medium text-text-primary">
                  {zone.name}
                </span>

                {/* Score */}
                <span
                  className="font-[family-name:var(--font-display)] text-sm font-bold tabular-nums"
                  style={{ color }}
                >
                  {Math.round(zone.score * 100)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-ocean-600">
                <div
                  className="animate-fill-bar h-full rounded-full"
                  style={{
                    width: `${zone.score * 100}%`,
                    backgroundColor: color,
                  }}
                />
              </div>

              {/* Category + fly-to hint */}
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[10px] text-text-tertiary">
                  {t(getCategoryLabelKey(zone.category))}
                </span>
                <MapPin className="h-3 w-3 text-text-tertiary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
