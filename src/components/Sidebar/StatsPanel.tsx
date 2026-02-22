"use client";

import type { SeaGlassZone, ProtectedArea } from "@/lib/types";
import { useTranslation } from "@/lib/i18n";

interface StatsPanelProps {
  zones: SeaGlassZone[];
  protectedAreas: ProtectedArea[];
}

interface StatCardProps {
  label: string;
  value: string | number;
  accent?: boolean;
}

function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <div className="group rounded-lg border border-white/[0.06] bg-ocean-700 p-3 shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-200 hover:border-glass/20 hover:shadow-[0_2px_12px_rgba(6,182,212,0.08)]">
      <p className="text-[10px] uppercase tracking-wider text-text-tertiary transition-colors duration-200 group-hover:text-text-secondary">
        {label}
      </p>
      <p
        className={`mt-1 font-[family-name:var(--font-display)] text-xl font-bold tabular-nums ${
          accent ? "text-glass" : "text-text-primary"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export function StatsPanel({ zones, protectedAreas }: StatsPanelProps) {
  const highProbCount = zones.filter((z) => z.score >= 0.55).length;
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-2">
      <StatCard label={t("stats.zonesDisplayed")} value={zones.length} accent />
      <StatCard label={t("stats.highProbability")} value={highProbCount} accent />
      <StatCard label={t("stats.protectedAreas")} value={protectedAreas.length} />
      <StatCard label={t("stats.coastlineKm")} value="3,219" />
    </div>
  );
}
