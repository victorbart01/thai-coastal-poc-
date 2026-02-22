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
    <div className="group glass-card rounded-2xl p-3 transition-all duration-200 hover:border-glass/20">
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
