"use client";

import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";

interface CheckboxRowProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  dotColor?: string;
  dotDashed?: boolean;
}

function CheckboxRow({
  label,
  checked,
  onChange,
  dotColor,
  dotDashed,
}: CheckboxRowProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1.5 transition-colors duration-150 hover:bg-ocean-600/30">
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

export function FiltersPanel() {
  const filters = useMapStore((s) => s.filters);
  const setFilter = useMapStore((s) => s.setFilter);
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-white/[0.06] bg-ocean-700 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {t("filters.title")}
      </h3>

      {/* Checkboxes */}
      <div className="mt-2 space-y-0.5">
        <CheckboxRow
          label={t("filters.highVeryHigh")}
          checked={filters.showHigh}
          onChange={(v) => setFilter("showHigh", v)}
          dotColor="#22d3ee"
        />
        <CheckboxRow
          label={t("filters.moderate")}
          checked={filters.showMedium}
          onChange={(v) => setFilter("showMedium", v)}
          dotColor="#facc15"
        />
        <CheckboxRow
          label={t("filters.low")}
          checked={filters.showLow}
          onChange={(v) => setFilter("showLow", v)}
          dotColor="#fb923c"
        />
        <CheckboxRow
          label={t("filters.protectedAreas")}
          checked={filters.showProtected}
          onChange={(v) => setFilter("showProtected", v)}
          dotColor="#ef4444"
          dotDashed
        />
        <CheckboxRow
          label={t("filters.rivers")}
          checked={filters.showRivers}
          onChange={(v) => setFilter("showRivers", v)}
          dotColor="#60a5fa"
          dotDashed
        />
      </div>

      {/* Separator */}
      <div className="my-3 border-t border-white/[0.06]" />

      {/* Range slider */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-text-tertiary">
            {t("filters.minScore")}
          </span>
          <span className="font-[family-name:var(--font-display)] text-xs font-medium tabular-nums text-glass">
            {(filters.minScore * 100).toFixed(0)}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={filters.minScore * 100}
          onChange={(e) => setFilter("minScore", Number(e.target.value) / 100)}
          className="score-slider mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ocean-600"
        />
        <div className="mt-1 flex justify-between">
          <span className="font-[family-name:var(--font-display)] text-[9px] text-text-tertiary">
            0%
          </span>
          <span className="font-[family-name:var(--font-display)] text-[9px] text-text-tertiary">
            100%
          </span>
        </div>
      </div>
    </div>
  );
}
