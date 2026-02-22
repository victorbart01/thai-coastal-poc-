"use client";

import type { SeaGlassZone, ProtectedArea, Spot } from "@/lib/types";
import { StatsPanel } from "./StatsPanel";
import { LegendPanel } from "./LegendPanel";
import { FiltersPanel } from "./FiltersPanel";
import { TopSpotsPanel } from "./TopSpotsPanel";
import { RecentFindsPanel } from "./RecentFindsPanel";
import { LeaderboardPanel } from "./LeaderboardPanel";
import { MethodologyPanel } from "./MethodologyPanel";

interface SidebarProps {
  zones: SeaGlassZone[];
  protectedAreas: ProtectedArea[];
  spots: Spot[];
}

const PANELS = [
  "stats",
  "legend",
  "filters",
  "topspots",
  "recentfinds",
  "leaderboard",
  "methodology",
] as const;
const STAGGER_MS = 80;

export function Sidebar({ zones, protectedAreas, spots }: SidebarProps) {
  return (
    <aside className="sidebar-scroll glass-surface flex h-full flex-col gap-3 overflow-y-auto p-3">
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
          {panel === "recentfinds" && <RecentFindsPanel spots={spots} />}
          {panel === "leaderboard" && <LeaderboardPanel spots={spots} />}
          {panel === "methodology" && <MethodologyPanel />}
        </div>
      ))}
    </aside>
  );
}
