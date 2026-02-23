import { create } from "zustand";
import type { SeaGlassZone, ScoreFilter, Spot, DraftSpot } from "@/lib/types";
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

const INITIAL_DRAFT: DraftSpot = {
  latitude: null,
  longitude: null,
  title: "",
  description: "",
  rating: 3,
  tags: [],
  photos: [],
};

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

  // Community spots
  showSpots: boolean;
  setShowSpots: (show: boolean) => void;

  selectedSpot: Spot | null;
  selectSpot: (spot: Spot | null) => void;

  // Spot form
  showSpotForm: boolean;
  spotFormStep: number; // 1-4
  draftSpot: DraftSpot;
  openSpotForm: () => void;
  closeSpotForm: () => void;
  setSpotFormStep: (step: number) => void;
  updateDraftSpot: (patch: Partial<DraftSpot>) => void;
  resetDraftSpot: () => void;

  // Search location (geocoding result)
  searchLocation: {
    name: string;
    latitude: number;
    longitude: number;
  } | null;
  setSearchLocation: (loc: {
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
  clearSearch: () => void;

  // User geolocation
  userLocation: { latitude: number; longitude: number } | null;
  setUserLocation: (loc: { latitude: number; longitude: number }) => void;
  clearUserLocation: () => void;

  // Admin spot repositioning
  repositioningSpot: { id: string; lat: number; lng: number } | null;
  startRepositioning: (spot: Spot) => void;
  updateRepositioningCoords: (lat: number, lng: number) => void;
  cancelRepositioning: () => void;

  // Onboarding coach marks (0 = inactive, 1-3 = current step)
  onboardingStep: number;
  startOnboarding: () => void;
  nextOnboardingStep: () => void;
  completeOnboarding: () => void;
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
    showRivers: false,
    showZones: false,
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

  // Community spots
  showSpots: true,
  setShowSpots: (show) => set({ showSpots: show }),

  selectedSpot: null,
  selectSpot: (spot) => set({ selectedSpot: spot }),

  // Spot form
  showSpotForm: false,
  spotFormStep: 1,
  draftSpot: { ...INITIAL_DRAFT },
  openSpotForm: () =>
    set({
      showSpotForm: true,
      spotFormStep: 1,
      draftSpot: { ...INITIAL_DRAFT },
      selectedSpot: null,
    }),
  closeSpotForm: () =>
    set({
      showSpotForm: false,
      spotFormStep: 1,
      draftSpot: { ...INITIAL_DRAFT },
    }),
  setSpotFormStep: (step) => set({ spotFormStep: step }),
  updateDraftSpot: (patch) =>
    set((state) => ({
      draftSpot: { ...state.draftSpot, ...patch },
    })),
  resetDraftSpot: () => set({ draftSpot: { ...INITIAL_DRAFT } }),

  // Search location
  searchLocation: null,
  setSearchLocation: (loc) =>
    set({
      searchLocation: loc,
      flyToTarget: { latitude: loc.latitude, longitude: loc.longitude, zoom: 11 },
    }),
  clearSearch: () =>
    set((state) => {
      // If user geolocation is active, fall back to it instead of resetting to Thailand
      if (state.userLocation) {
        return {
          searchLocation: null,
          flyToTarget: {
            latitude: state.userLocation.latitude,
            longitude: state.userLocation.longitude,
            zoom: 9,
          },
        };
      }
      return {
        searchLocation: null,
        flyToTarget: { latitude: 12.5, longitude: 101, zoom: 6 },
      };
    }),

  // User geolocation
  userLocation: null,
  setUserLocation: (loc) =>
    set({
      userLocation: loc,
      flyToTarget: { latitude: loc.latitude, longitude: loc.longitude, zoom: 9 },
    }),
  clearUserLocation: () =>
    set({
      userLocation: null,
    }),

  // Admin spot repositioning
  repositioningSpot: null,
  startRepositioning: (spot) =>
    set({
      repositioningSpot: { id: spot.id, lat: spot.latitude, lng: spot.longitude },
    }),
  updateRepositioningCoords: (lat, lng) =>
    set((state) =>
      state.repositioningSpot
        ? { repositioningSpot: { ...state.repositioningSpot, lat, lng } }
        : {}
    ),
  cancelRepositioning: () => set({ repositioningSpot: null }),

  // Onboarding
  onboardingStep: 0,
  startOnboarding: () => set({ onboardingStep: 1 }),
  nextOnboardingStep: () =>
    set((state) => ({
      onboardingStep: state.onboardingStep < 3 ? state.onboardingStep + 1 : 0,
    })),
  completeOnboarding: () => set({ onboardingStep: 0 }),
}));
