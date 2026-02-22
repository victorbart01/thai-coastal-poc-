"use client";

import { Popup } from "react-map-gl";
import { AlertTriangle } from "lucide-react";
import type { SeaGlassZone, ProtectedArea } from "@/lib/types";
import {
  getScoreColor,
  getScoreLabel,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/colors";

interface ZonePopupProps {
  zone: SeaGlassZone;
  nearbyProtected: ProtectedArea | null;
  onClose: () => void;
}

const SUBSCORE_LABELS: {
  key: keyof SeaGlassZone["subscores"];
  label: string;
}[] = [
  { key: "historical", label: "Historique" },
  { key: "morphology", label: "Morphologie" },
  { key: "river", label: "Fluvial" },
  { key: "ocean", label: "Océanique" },
  { key: "population", label: "Population" },
];

/**
 * Rich popup displayed when a zone circle is clicked.
 * Shows score, animated sub-score bars, category badge, notes,
 * and a warning if the zone falls within a protected area.
 */
export function ZonePopup({ zone, nearbyProtected, onClose }: ZonePopupProps) {
  const color = getScoreColor(zone.score);
  const label = getScoreLabel(zone.score);
  const categoryColor = CATEGORY_COLORS[zone.category];

  return (
    <Popup
      longitude={zone.coordinates[0]}
      latitude={zone.coordinates[1]}
      onClose={onClose}
      closeOnClick={false}
      maxWidth="320px"
      offset={16}
    >
      <div
        className="min-w-[280px] rounded-xl p-4"
        style={{ borderLeft: `3px solid ${color}` }}
      >
        {/* Header */}
        <h3 className="pr-4 font-[family-name:var(--font-display)] text-sm font-semibold leading-snug text-text-primary">
          {zone.name}
        </h3>

        {/* Score display */}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span
            className="font-[family-name:var(--font-display)] text-2xl font-bold"
            style={{ color }}
          >
            {Math.round(zone.score * 100)}%
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{
              backgroundColor: `${color}15`,
              color,
            }}
          >
            {label}
          </span>
        </div>

        {/* Sub-scores with animated bars */}
        <div className="mt-3 space-y-2">
          {SUBSCORE_LABELS.map(({ key, label: subLabel }) => {
            const value = zone.subscores[key];
            return (
              <div key={key} className="flex items-center gap-2">
                <span className="w-[72px] shrink-0 text-[10px] text-text-tertiary">
                  {subLabel}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ocean-600">
                  <div
                    className="animate-fill-bar h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${value * 100}%`,
                      backgroundColor: color,
                      opacity: 0.5 + value * 0.5,
                    }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right font-[family-name:var(--font-display)] text-[10px] text-text-secondary">
                  {Math.round(value * 100)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Category badge */}
        <div className="mt-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium"
            style={{
              backgroundColor: `${categoryColor}15`,
              color: categoryColor,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: categoryColor }}
            />
            {CATEGORY_LABELS[zone.category]}
          </span>
        </div>

        {/* Notes */}
        <p className="mt-2.5 text-[11px] leading-relaxed text-text-secondary">
          {zone.notes}
        </p>

        {/* Protected area warning */}
        {nearbyProtected && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-danger/20 bg-danger/5 p-2.5">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" />
            <div>
              <p className="text-[11px] font-medium text-danger">
                Zone protégée à proximité
              </p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-danger/70">
                {nearbyProtected.name} —{" "}
                {nearbyProtected.status === "prohibited"
                  ? "collecte strictement interdite"
                  : "collecte restreinte"}
                . {nearbyProtected.legalBasis}.
              </p>
            </div>
          </div>
        )}
      </div>
    </Popup>
  );
}
