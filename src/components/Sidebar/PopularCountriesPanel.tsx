"use client";

import { useMemo } from "react";
import type { Spot } from "@/lib/types";
import { countryFromCoords } from "@/lib/countryFromCoords";
import { useTranslation } from "@/lib/i18n";

interface PopularCountriesPanelProps {
  spots: Spot[];
}

export function PopularCountriesPanel({ spots }: PopularCountriesPanelProps) {
  const { t } = useTranslation();

  const topCountries = useMemo(() => {
    const counts = new Map<string, { name: string; flag: string; count: number }>();

    for (const spot of spots) {
      const { name, flag } = countryFromCoords(spot.latitude, spot.longitude);
      const existing = counts.get(name);
      if (existing) {
        existing.count++;
      } else {
        counts.set(name, { name, flag, count: 1 });
      }
    }

    return Array.from(counts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [spots]);

  if (topCountries.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-4">
      <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {t("countries.title")}
      </h3>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {topCountries.map(({ name, flag, count }) => (
          <span
            key={name}
            className="inline-flex items-center gap-1 rounded-full bg-black/[0.03] px-2.5 py-1 text-[11px] font-medium text-text-primary"
          >
            {flag} {name} {count}
          </span>
        ))}
      </div>
    </div>
  );
}
