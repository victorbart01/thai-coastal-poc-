import { create } from "zustand";
import type { SeaGlassZone, ScoreFilter } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface FlyToTarget {
  latitude: number;
  longitude: number;
  zoom?: number;
}

interface MapState {
  // Locale
  locale: Locale;
  setLocale: (locale: Locale) => void;

  // Filters
  filters: ScoreFilter;
  setFilter: <K extends keyof ScoreFilter>(
    key: K,
    value: ScoreFilter[K]
  ) => void;

  // Selected zone
  selectedZone: SeaGlassZone | null;
  selectZone: (zone: SeaGlassZone | null) => void;
  clearSelection: () => void;

  // Viewport
  viewport: MapViewport;
  setViewport: (viewport: MapViewport) => void;

  // FlyTo target (consumed by the map component)
  flyToTarget: FlyToTarget | null;
  flyTo: (target: FlyToTarget) => void;
  clearFlyTo: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  // Locale
  locale: "en",
  setLocale: (locale) => set({ locale }),

  // Default filters: show everything
  filters: {
    minScore: 0,
    showHigh: true,
    showMedium: true,
    showLow: true,
    showProtected: true,
    showRivers: true,
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  // Selection
  selectedZone: null,
  selectZone: (zone) => set({ selectedZone: zone }),
  clearSelection: () => set({ selectedZone: null }),

  // Viewport — centered on Thailand
  viewport: {
    latitude: 12.5,
    longitude: 101,
    zoom: 6,
  },
  setViewport: (viewport) => set({ viewport }),

  // FlyTo
  flyToTarget: null,
  flyTo: (target) => set({ flyToTarget: target }),
  clearFlyTo: () => set({ flyToTarget: null }),
}));
