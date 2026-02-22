"use client";

import { Popup } from "react-map-gl";
import { ShieldAlert } from "lucide-react";
import type { ProtectedArea } from "@/lib/types";

interface ProtectedPopupProps {
  area: ProtectedArea;
  onClose: () => void;
}

const STATUS_LABELS: Record<ProtectedArea["status"], string> = {
  prohibited: "Collecte interdite",
  restricted: "Collecte restreinte",
};

const STATUS_DESCRIPTIONS: Record<ProtectedArea["status"], string> = {
  prohibited:
    "La collecte de tout matériau — naturel ou non — est strictement interdite dans ce parc national. Les contrevenants s'exposent à une amende pouvant aller jusqu'à 100 000 THB et/ou une peine d'emprisonnement.",
  restricted:
    "La collecte est soumise à autorisation préalable du parc. Vérifiez les conditions locales auprès de l'administration du parc avant toute activité.",
};

/**
 * Popup displayed when a protected area is clicked.
 * Shows name, status, legal basis, and detailed legal warning.
 */
export function ProtectedPopup({ area, onClose }: ProtectedPopupProps) {
  return (
    <Popup
      longitude={area.coordinates[0]}
      latitude={area.coordinates[1]}
      onClose={onClose}
      closeOnClick={false}
      maxWidth="300px"
      offset={16}
    >
      <div className="min-w-[260px] rounded-xl border-l-[3px] border-l-danger p-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 shrink-0 text-danger" />
          <h3 className="pr-4 font-[family-name:var(--font-display)] text-sm font-semibold text-text-primary">
            {area.name}
          </h3>
        </div>

        {/* Status badge */}
        <div className="mt-2.5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
              area.status === "prohibited"
                ? "bg-danger/15 text-danger"
                : "bg-score-low/15 text-score-low"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                area.status === "prohibited" ? "bg-danger" : "bg-score-low"
              }`}
            />
            {STATUS_LABELS[area.status]}
          </span>
        </div>

        {/* Radius */}
        <p className="mt-2.5 text-[11px] text-text-secondary">
          <span className="text-text-tertiary">Rayon de protection : </span>
          <span className="font-[family-name:var(--font-display)] font-medium">
            {area.radiusKm} km
          </span>
        </p>

        {/* Legal basis */}
        <p className="mt-1.5 text-[11px] text-text-secondary">
          <span className="text-text-tertiary">Base légale : </span>
          {area.legalBasis}
        </p>

        {/* Detailed warning */}
        <div className="mt-3 rounded-lg border border-danger/10 bg-danger/5 p-2.5">
          <p className="text-[10px] leading-relaxed text-text-secondary">
            {STATUS_DESCRIPTIONS[area.status]}
          </p>
        </div>
      </div>
    </Popup>
  );
}
