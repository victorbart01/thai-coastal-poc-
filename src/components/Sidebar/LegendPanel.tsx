"use client";

const SCORE_LEVELS = [
  { label: "Très élevé", sublabel: "≥ 75%", color: "#06b6d4" },
  { label: "Élevé", sublabel: "55–74%", color: "#22d3ee" },
  { label: "Modéré", sublabel: "35–54%", color: "#facc15" },
  { label: "Faible", sublabel: "15–34%", color: "#fb923c" },
  { label: "Très faible", sublabel: "< 15%", color: "#64748b" },
];

export function LegendPanel() {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-ocean-700 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
        Légende
      </h3>

      {/* Score levels */}
      <div className="mt-3 space-y-2">
        {SCORE_LEVELS.map((level) => (
          <div key={level.label} className="flex items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.2)]"
              style={{ backgroundColor: level.color }}
            />
            <span className="text-xs text-text-body">{level.label}</span>
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
          <span className="text-xs text-text-body">Zone protégée</span>
          <span className="ml-auto text-[10px] text-text-tertiary">
            Collecte interdite
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 shrink-0 items-center justify-center">
            <span className="h-2.5 w-2.5 rounded-full border border-dashed border-river" />
          </span>
          <span className="text-xs text-text-body">Embouchure</span>
          <span className="ml-auto text-[10px] text-text-tertiary">
            Source de verre
          </span>
        </div>
      </div>
    </div>
  );
}
