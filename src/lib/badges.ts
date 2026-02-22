import type { Badge, UserStats } from "@/lib/types";

export const BADGE_DEFINITIONS: Badge[] = [
  { id: "first_drop",   icon: "📍", rarity: "common",    criteria_type: "spots_count",        criteria_value: 1  },
  { id: "explorer",     icon: "🧭", rarity: "rare",      criteria_type: "spots_count",        criteria_value: 5  },
  { id: "photographer", icon: "📸", rarity: "rare",      criteria_type: "photos_count",       criteria_value: 20 },
  { id: "local_expert", icon: "🏆", rarity: "epic",      criteria_type: "spots_count",        criteria_value: 10 },
  { id: "rare_find",    icon: "💎", rarity: "legendary", criteria_type: "max_likes_on_spot",  criteria_value: 50 },
  { id: "sea_glass_og", icon: "🌊", rarity: "legendary", criteria_type: "member_days",        criteria_value: 30 },
];

/** Returns badge IDs the user qualifies for based on their stats */
export function checkBadgeCriteria(stats: UserStats): string[] {
  return BADGE_DEFINITIONS
    .filter((badge) => {
      const value = stats[badge.criteria_type as keyof UserStats];
      return typeof value === "number" && value >= badge.criteria_value;
    })
    .map((b) => b.id);
}
