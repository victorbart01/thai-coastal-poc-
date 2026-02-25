import type { Badge, UserStats } from "@/lib/types";

export const BADGE_DEFINITIONS: Badge[] = [
  // ── COMMON (8) — "Welcome aboard" ──────────────────────────
  { id: "first_drop",   icon: "📍", rarity: "common",    criteria_type: "spots_count",          criteria_value: 1   },
  { id: "first_snap",   icon: "📷", rarity: "common",    criteria_type: "photos_count",         criteria_value: 1   },
  { id: "warm_welcome", icon: "👋", rarity: "common",    criteria_type: "total_likes_received", criteria_value: 1   },
  { id: "good_eye",     icon: "👁️", rarity: "common",    criteria_type: "likes_given",          criteria_value: 5   },
  { id: "collector",    icon: "🔖", rarity: "common",    criteria_type: "saves_count",          criteria_value: 3   },
  { id: "first_words",  icon: "💬", rarity: "common",    criteria_type: "comments_count",       criteria_value: 1   },
  { id: "new_member",   icon: "🌱", rarity: "common",    criteria_type: "member_days",          criteria_value: 7   },
  { id: "tagger",       icon: "🏷️", rarity: "common",    criteria_type: "unique_tags_used",     criteria_value: 3   },

  // ── RARE (6) — "Getting serious" ──────────────────────────
  { id: "explorer",         icon: "🧭", rarity: "rare", criteria_type: "spots_count",          criteria_value: 5   },
  { id: "photographer",     icon: "📸", rarity: "rare", criteria_type: "photos_count",         criteria_value: 20  },
  { id: "crowd_pleaser",    icon: "❤️", rarity: "rare", criteria_type: "total_likes_received", criteria_value: 25  },
  { id: "curator",          icon: "🗂️", rarity: "rare", criteria_type: "saves_count",          criteria_value: 15  },
  { id: "social_butterfly", icon: "🦋", rarity: "rare", criteria_type: "comments_count",       criteria_value: 10  },
  { id: "supporter",        icon: "🤝", rarity: "rare", criteria_type: "likes_given",          criteria_value: 25  },

  // ── EPIC (5) — "Dedicated collector" ──────────────────────
  { id: "local_expert", icon: "🏆", rarity: "epic", criteria_type: "spots_count",          criteria_value: 10  },
  { id: "paparazzi",    icon: "🎞️", rarity: "epic", criteria_type: "photos_count",         criteria_value: 50  },
  { id: "influencer",   icon: "⭐", rarity: "epic", criteria_type: "total_likes_received", criteria_value: 100 },
  { id: "storyteller",  icon: "📖", rarity: "epic", criteria_type: "comments_count",       criteria_value: 50  },
  { id: "seasoned",     icon: "🍂", rarity: "epic", criteria_type: "member_days",          criteria_value: 90  },

  // ── LEGENDARY (5) — "The elite" ───────────────────────────
  { id: "rare_find",     icon: "💎", rarity: "legendary", criteria_type: "max_likes_on_spot",   criteria_value: 50  },
  { id: "sea_glass_og",  icon: "🌊", rarity: "legendary", criteria_type: "member_days",         criteria_value: 30  },
  { id: "cartographer",  icon: "🗺️", rarity: "legendary", criteria_type: "spots_count",         criteria_value: 30  },
  { id: "hall_of_fame",  icon: "👑", rarity: "legendary", criteria_type: "total_likes_received", criteria_value: 500 },
  { id: "veteran",       icon: "🔱", rarity: "legendary", criteria_type: "member_days",         criteria_value: 365 },
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
