"use client";

import type { Spot } from "@/lib/types";
import { useNearbySpots } from "@/lib/useNearbySpots";
import { TaglineSection } from "./TaglineSection";
import { SearchBar } from "./SearchBar";
import { QuickLinks } from "./QuickLinks";
import { PopularSpotsPanel } from "./PopularSpotsPanel";
import { ActivityFeed } from "./ActivityFeed";
import { LeaderboardPanel } from "./LeaderboardPanel";
import { MapToggles } from "./MapToggles";

interface SidebarProps {
  spots: Spot[];
}

const PANELS = [
  "tagline",
  "search",
  "quicklinks",
  "popular",
  "activity",
  "contributors",
  "toggles",
] as const;
const STAGGER_MS = 80;

export function Sidebar({ spots }: SidebarProps) {
  const nearbySpots = useNearbySpots(spots);

  return (
    <aside className="sidebar-scroll glass-surface flex h-full flex-col gap-3 overflow-y-auto p-3">
      {PANELS.map((panel, i) => (
        <div
          key={panel}
          className={`animate-slide-in${panel === "search" ? " relative z-40" : ""}`}
          style={{ animationDelay: `${i * STAGGER_MS}ms` }}
        >
          {panel === "tagline" && <TaglineSection />}
          {panel === "search" && <SearchBar />}
          {panel === "quicklinks" && <QuickLinks />}
          {panel === "popular" && <PopularSpotsPanel spots={nearbySpots} />}
          {panel === "activity" && <ActivityFeed spots={nearbySpots} />}
          {panel === "contributors" && <LeaderboardPanel spots={nearbySpots} />}
          {panel === "toggles" && <MapToggles />}
        </div>
      ))}
    </aside>
  );
}
