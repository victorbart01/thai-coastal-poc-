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
};
