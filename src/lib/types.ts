export interface SeaGlassZone {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  score: number; // 0–1, score total pondéré
  subscores: {
    historical: number; // M_hist : proximité décharges/industries
    morphology: number; // M_morpho : type de côte favorable
    river: number; // M_river : proximité embouchure + pop amont
    ocean: number; // M_ocean : exposition courants dominants
    population: number; // M_pop : densité historique côtière
  };
  category:
    | "river_delta"
    | "industrial"
    | "urban_coast"
    | "island"
    | "river_mouth"
    | "natural";
  classification: "very_high" | "high" | "medium" | "low" | "very_low";
  photos?: string[]; // URL paths to photos (e.g. "/images/koh_sichang_1.png")
  placeQuery?: string; // Google Places search query for fetching photos
  notes: string; // Description en 1-2 phrases
  region:
    | "upper_gulf"
    | "eastern_seaboard"
    | "central_gulf"
    | "lower_gulf"
    | "andaman";
}

export interface ProtectedArea {
  id: string;
  name: string;
  coordinates: [number, number]; // centroïde
  radiusKm: number;
  status: "prohibited" | "restricted";
  legalBasis: string;
  notes: string;
}

export interface RiverMouth {
  id: string;
  name: string;
  coordinates: [number, number];
  populationUpstream: string; // ex: "12M+"
  majorCity: string; // ville principale en amont
}

export type ScoreFilter = {
  minScore: number;
  showHigh: boolean;
  showMedium: boolean;
  showLow: boolean;
  showProtected: boolean;
  showRivers: boolean;
  showZones: boolean;
};

// ─── Community Spots ("Drops") ──────────────────────────────

export const SPOT_TAGS = [
  "rocky_beach",
  "sandy_beach",
  "cove",
  "pier",
  "river_mouth",
  "island",
  "urban",
  "remote",
] as const;

export type SpotTag = (typeof SPOT_TAGS)[number];

export interface SpotPhoto {
  id: string;
  storage_path: string;
  position: number;
  url: string; // computed public URL
}

export interface SpotAuthor {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
}

export interface Spot {
  id: string;
  user_id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  rating: number; // 1-5
  tags: SpotTag[];
  status: string;
  created_at: string;
  updated_at: string;
  photos: SpotPhoto[];
  author: SpotAuthor;
  like_count?: number;
  comment_count?: number;
  is_liked?: boolean;
  is_saved?: boolean;
}

export interface Comment {
  id: string;
  spot_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  author: SpotAuthor;
  replies?: Comment[];
}

export interface SpotSocialCounts {
  like_count: number;
  comment_count: number;
  is_liked: boolean;
  is_saved: boolean;
}

export interface DraftSpot {
  latitude: number | null;
  longitude: number | null;
  title: string;
  description: string;
  rating: number;
  tags: SpotTag[];
  photos: File[];
}

// ─── Gamification ───────────────────────────────────────────

export type BadgeRarity = "common" | "rare" | "epic" | "legendary";

export interface Badge {
  id: string;
  icon: string;
  rarity: BadgeRarity;
  criteria_type: string;
  criteria_value: number;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}

export interface UserStats {
  spots_count: number;
  photos_count: number;
  total_likes_received: number;
  max_likes_on_spot: number;
  member_days: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: SpotAuthor;
  spots_count: number;
  likes_received: number;
  score: number;
}
