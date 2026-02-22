"use client";

import { Popup } from "react-map-gl";
import { ShieldAlert } from "lucide-react";
import type { ProtectedArea } from "@/lib/types";
import { useTranslation } from "@/lib/i18n";

interface ProtectedPopupProps {
  area: ProtectedArea;
  onClose: () => void;
}

/**
 * Popup displayed when a protected area is clicked.
 * Shows name, status, legal basis, and detailed legal warning.
 */
export function ProtectedPopup({ area, onClose }: ProtectedPopupProps) {
  const { t } = useTranslation();

  const statusLabel =
    area.status === "prohibited"
      ? t("protected.prohibited")
      : t("protected.restricted");

  const statusDescription =
    area.status === "prohibited"
      ? t("protected.prohibitedDesc")
      : t("protected.restrictedDesc");

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
            {statusLabel}
          </span>
        </div>

        {/* Radius */}
        <p className="mt-2.5 text-[11px] text-text-secondary">
          <span className="text-text-tertiary">{t("protected.protectionRadius")} </span>
          <span className="font-[family-name:var(--font-display)] font-medium">
            {area.radiusKm} km
          </span>
        </p>

        {/* Legal basis */}
        <p className="mt-1.5 text-[11px] text-text-secondary">
          <span className="text-text-tertiary">{t("protected.legalBasis")} </span>
          {area.legalBasis}
        </p>

        {/* Detailed warning */}
        <div className="mt-3 rounded-lg border border-danger/10 bg-danger/5 p-2.5">
          <p className="text-[10px] leading-relaxed text-text-secondary">
            {statusDescription}
          </p>
        </div>
      </div>
    </Popup>
  );
}
