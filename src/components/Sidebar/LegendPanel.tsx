"use client";

import { useTranslation } from "@/lib/i18n";

export function LegendPanel() {
  const { t } = useTranslation();

  const SCORE_LEVELS = [
    { labelKey: "legend.veryHigh", sublabel: "\u2265 75%", color: "#06b6d4" },
    { labelKey: "legend.high", sublabel: "55\u201374%", color: "#22d3ee" },
    { labelKey: "legend.moderate", sublabel: "35\u201354%", color: "#facc15" },
    { labelKey: "legend.low", sublabel: "15\u201334%", color: "#fb923c" },
    { labelKey: "legend.veryLow", sublabel: "< 15%", color: "#64748b" },
  ];

  return (
    <div className="rounded-lg border border-white/[0.06] bg-ocean-700 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {t("legend.title")}
      </h3>

      {/* Score levels */}
      <div className="mt-3 space-y-2">
        {SCORE_LEVELS.map((level) => (
          <div key={level.labelKey} className="flex items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.2)]"
              style={{ backgroundColor: level.color }}
            />
            <span className="text-xs text-text-body">{t(level.labelKey)}</span>
            <span className="ml-auto font-[family-name:var(--font-display)] text-[10px] tabular-nums text-text-tertiary">
              {level.sublabel}
            </span>
          </div>
        ))}
      </div>

      {/* Separator */}
      <div className="my-3 border-t border-white/[0.06]" />

      {/* Symbols */}
      <div className="space-y-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 shrink-0 items-center justify-center">
            <span className="h-2.5 w-2.5 rounded-full border border-danger/60" />
          </span>
          <span className="text-xs text-text-body">{t("legend.protectedArea")}</span>
          <span className="ml-auto text-[10px] text-text-tertiary">
            {t("legend.collectionForbidden")}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 shrink-0 items-center justify-center">
            <span className="h-2.5 w-2.5 rounded-full border border-dashed border-river" />
          </span>
          <span className="text-xs text-text-body">{t("legend.riverMouth")}</span>
          <span className="ml-auto text-[10px] text-text-tertiary">
            {t("legend.glassSource")}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white/50 shadow-[0_0_6px_rgba(0,0,0,0.2)]"
            style={{ backgroundColor: "#f472b6" }}
          />
          <span className="text-xs text-text-body">{t("legend.communitySpot")}</span>
          <span className="ml-auto text-[10px] text-text-tertiary">
            {t("legend.userSubmitted")}
          </span>
        </div>
      </div>
    </div>
  );
}
