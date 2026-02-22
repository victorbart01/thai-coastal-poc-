"use client";

import type { SeaGlassZone, ProtectedArea } from "@/lib/types";
import { StatsPanel } from "./StatsPanel";
import { LegendPanel } from "./LegendPanel";
import { FiltersPanel } from "./FiltersPanel";
import { TopSpotsPanel } from "./TopSpotsPanel";
import { MethodologyPanel } from "./MethodologyPanel";

interface SidebarProps {
  zones: SeaGlassZone[];
  protectedAreas: ProtectedArea[];
}

const PANELS = [
  "stats",
  "legend",
  "filters",
  "topspots",
  "methodology",
] as const;
const STAGGER_MS = 80;

export function Sidebar({ zones, protectedAreas }: SidebarProps) {
  return (
    <aside className="sidebar-scroll flex h-full flex-col gap-3 overflow-y-auto bg-ocean-900 p-3">
      {PANELS.map((panel, i) => (
        <div
          key={panel}
          className="animate-slide-in"
          style={{ animationDelay: `${i * STAGGER_MS}ms` }}
        >
          {panel === "stats" && (
            <StatsPanel zones={zones} protectedAreas={protectedAreas} />
          )}
          {panel === "legend" && <LegendPanel />}
          {panel === "filters" && <FiltersPanel />}
          {panel === "topspots" && <TopSpotsPanel zones={zones} />}
          {panel === "methodology" && <MethodologyPanel />}
        </div>
      ))}
    </aside>
  );
}
