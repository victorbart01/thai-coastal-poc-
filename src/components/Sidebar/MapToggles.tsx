"use client";

import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  dotColor?: string;
  dotDashed?: boolean;
}

function ToggleRow({ label, checked, onChange, dotColor, dotDashed }: ToggleRowProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1.5 transition-colors duration-150 hover:bg-black/[0.06]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-3.5 w-3.5 rounded border-ocean-500 bg-ocean-600 text-glass accent-glass-deep focus:ring-1 focus:ring-glass/30"
      />
      {dotColor && (
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${
            dotDashed ? "border border-dashed" : ""
          }`}
          style={{
            backgroundColor: dotDashed ? "transparent" : dotColor,
            borderColor: dotDashed ? dotColor : undefined,
          }}
        />
      )}
      <span className="text-xs text-text-body">{label}</span>
    </label>
  );
}

export function MapToggles() {
  const filters = useMapStore((s) => s.filters);
  const setFilter = useMapStore((s) => s.setFilter);
  const { t } = useTranslation();

  return (
    <div className="glass-card rounded-2xl p-4">
      <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {t("toggles.title")}
      </h3>

      <div className="mt-2 space-y-0.5">
        <ToggleRow
          label={t("toggles.zones")}
          checked={filters.showZones}
          onChange={(v) => setFilter("showZones", v)}
          dotColor="#94a3b8"
        />
        <ToggleRow
          label={t("filters.protectedAreas")}
          checked={filters.showProtected}
          onChange={(v) => setFilter("showProtected", v)}
          dotColor="#ef4444"
          dotDashed
        />
        <ToggleRow
          label={t("filters.rivers")}
          checked={filters.showRivers}
          onChange={(v) => setFilter("showRivers", v)}
          dotColor="#60a5fa"
          dotDashed
        />
      </div>
    </div>
  );
}
