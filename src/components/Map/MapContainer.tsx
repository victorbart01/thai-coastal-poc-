"use client";

import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import Map, {
  Popup,
  AttributionControl,
  type MapRef,
  type MapLayerMouseEvent,
  type ViewStateChangeEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { distance as turfDistance } from "@turf/turf";

import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";
import type { SeaGlassZone, ProtectedArea, RiverMouth, Spot } from "@/lib/types";
import type { FeatureCollection, Point } from "geojson";

import { ZoneLayer } from "./ZoneLayer";
import { ProtectedLayer } from "./ProtectedLayer";
import { RiverLayer } from "./RiverLayer";
import { ZonePopup } from "./ZonePopup";
import { ProtectedPopup } from "./ProtectedPopup";
import { SpotLayer } from "./SpotLayer";
import { DraftMarker } from "@/components/SpotForm/DraftMarker";
import { DraggableSpotMarker } from "./DraggableSpotMarker";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const INITIAL_VIEW = {
  longitude: 101,
  latitude: 12.5,
  zoom: 6,
};

/** Convert a SeaGlassZone array back to GeoJSON FeatureCollection */
function zonesToGeoJSON(zones: SeaGlassZone[]): FeatureCollection<Point> {
  return {
    type: "FeatureCollection",
    features: zones.map((zone) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: zone.coordinates,
      },
      properties: {
        id: zone.id,
        name: zone.name,
        score: zone.score,
        classification: zone.classification,
        category: zone.category,
        historical: zone.subscores.historical,
        morphology: zone.subscores.morphology,
        river: zone.subscores.river,
        ocean: zone.subscores.ocean,
        population: zone.subscores.population,
        notes: zone.notes,
        region: zone.region,
      },
    })),
  };
}

type PopupInfo =
  | { type: "zone"; zone: SeaGlassZone; nearbyProtected: ProtectedArea | null }
  | { type: "protected"; area: ProtectedArea }
  | { type: "river"; river: RiverMouth }
  | null;

/** Check if a zone falls within any protected area's radius */
function findNearbyProtected(
  zone: SeaGlassZone,
  areas: ProtectedArea[]
): ProtectedArea | null {
  for (const area of areas) {
    const dist = turfDistance(zone.coordinates, area.coordinates, {
      units: "kilometers",
    });
    if (dist <= area.radiusKm) return area;
  }
  return null;
}

interface MapContainerProps {
  filteredZones: SeaGlassZone[];
  protectedAreas: ProtectedArea[];
  riverMouths: RiverMouth[];
  spots: Spot[];
}

/**
 * Main map component — wraps react-map-gl Map with all data layers,
 * popups, hover state, and interaction handling.
 */
export function MapContainer({
  filteredZones,
  protectedAreas,
  riverMouths,
  spots,
}: MapContainerProps) {
  const mapRef = useRef<MapRef>(null);
  const selectZone = useMapStore((s) => s.selectZone);
  const clearSelection = useMapStore((s) => s.clearSelection);
  const flyToTarget = useMapStore((s) => s.flyToTarget);
  const clearFlyTo = useMapStore((s) => s.clearFlyTo);
  const setViewport = useMapStore((s) => s.setViewport);
  const selectedZone = useMapStore((s) => s.selectedZone);
  const spotFormStep = useMapStore((s) => s.spotFormStep);
  const showSpotForm = useMapStore((s) => s.showSpotForm);
  const updateDraftSpot = useMapStore((s) => s.updateDraftSpot);
  const setSpotFormStep = useMapStore((s) => s.setSpotFormStep);
  const selectSpot = useMapStore((s) => s.selectSpot);

  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const [popupInfo, setPopupInfo] = useState<PopupInfo>(null);

  const isLocationStep = showSpotForm && spotFormStep === 1;

  // Build GeoJSON from filtered zones
  const zonesGeoJSON = useMemo(
    () => zonesToGeoJSON(filteredZones),
    [filteredZones]
  );

  // Sync popup with store's selectedZone (e.g. when sidebar TopSpots click)
  useEffect(() => {
    if (selectedZone) {
      setPopupInfo((prev) => {
        if (prev?.type === "zone" && prev.zone.id === selectedZone.id)
          return prev;
        return {
          type: "zone",
          zone: selectedZone,
          nearbyProtected: findNearbyProtected(selectedZone, protectedAreas),
        };
      });
    }
  }, [selectedZone, protectedAreas]);

  // Update popup data when zones/protectedAreas change (e.g. locale switch)
  useEffect(() => {
    if (popupInfo?.type === "zone") {
      const freshZone = filteredZones.find((z) => z.id === popupInfo.zone.id);
      if (freshZone && freshZone !== popupInfo.zone) {
        setPopupInfo({
          type: "zone",
          zone: freshZone,
          nearbyProtected: findNearbyProtected(freshZone, protectedAreas),
        });
      }
    } else if (popupInfo?.type === "protected") {
      const freshArea = protectedAreas.find((a) => a.id === popupInfo.area.id);
      if (freshArea && freshArea !== popupInfo.area) {
        setPopupInfo({ type: "protected", area: freshArea });
      }
    } else if (popupInfo?.type === "river") {
      const freshRiver = riverMouths.find((r) => r.id === popupInfo.river.id);
      if (freshRiver && freshRiver !== popupInfo.river) {
        setPopupInfo({ type: "river", river: freshRiver });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally react to data array changes only (locale switch)
  }, [filteredZones, protectedAreas, riverMouths]);

  // Handle flyTo requests from the store
  useEffect(() => {
    if (flyToTarget && mapRef.current) {
      mapRef.current.flyTo({
        center: [flyToTarget.longitude, flyToTarget.latitude],
        zoom: flyToTarget.zoom ?? 11,
        duration: 1500,
        curve: 1.42,
      });
      clearFlyTo();
    }
  }, [flyToTarget, clearFlyTo]);

  // Zone & spot hover
  const [hoveredSpot, setHoveredSpot] = useState(false);
  const handleMouseMove = useCallback((e: MapLayerMouseEvent) => {
    const feature = e.features?.[0];
    if (feature?.layer?.id === "zones-circle") {
      setHoveredZoneId((feature.properties?.id as string) ?? null);
      setHoveredSpot(false);
    } else if (feature?.layer?.id === "spots-unclustered" || feature?.layer?.id === "spots-clusters") {
      setHoveredZoneId(null);
      setHoveredSpot(true);
    } else {
      setHoveredZoneId(null);
      setHoveredSpot(false);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredZoneId(null);
    setHoveredSpot(false);
  }, []);

  // Click handler for map layers
  const handleClick = useCallback(
    (e: MapLayerMouseEvent) => {
      // Step 1 of spot form: pick location
      if (isLocationStep) {
        updateDraftSpot({
          latitude: e.lngLat.lat,
          longitude: e.lngLat.lng,
        });
        setSpotFormStep(2);
        return;
      }

      // Check spot clusters → zoom in
      const clusterFeature = e.features?.find(
        (f) => f.layer?.id === "spots-clusters"
      );
      if (clusterFeature && mapRef.current) {
        const clusterId = clusterFeature.properties?.cluster_id;
        const source = mapRef.current.getSource("spots-source") as unknown as {
          getClusterExpansionZoom: (
            id: number,
            cb: (err: unknown, zoom: number) => void
          ) => void;
        };
        if (source?.getClusterExpansionZoom && clusterId != null) {
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            const coords = (clusterFeature.geometry as GeoJSON.Point)
              .coordinates as [number, number];
            mapRef.current?.flyTo({
              center: coords,
              zoom: zoom,
              duration: 500,
            });
          });
          return;
        }
      }

      // Check unclustered spot click
      const spotFeature = e.features?.find(
        (f) => f.layer?.id === "spots-unclustered"
      );
      if (spotFeature) {
        const spotId = spotFeature.properties?.id;
        const spot = spots.find((s) => s.id === spotId);
        if (spot) {
          selectSpot(spot);
          return;
        }
      }

      // Check zone layer first (topmost)
      const zoneFeature = e.features?.find(
        (f) => f.layer?.id === "zones-circle"
      );
      if (zoneFeature) {
        const zoneId = zoneFeature.properties?.id;
        const zone = filteredZones.find((z) => z.id === zoneId);
        if (zone) {
          selectZone(zone);
          setPopupInfo({
            type: "zone",
            zone,
            nearbyProtected: findNearbyProtected(zone, protectedAreas),
          });
          return;
        }
      }

      // Check protected area layer
      const protectedFeature = e.features?.find(
        (f) => f.layer?.id === "protected-fill"
      );
      if (protectedFeature) {
        const areaId = protectedFeature.properties?.id;
        const area = protectedAreas.find((a) => a.id === areaId);
        if (area) {
          setPopupInfo({ type: "protected", area });
          return;
        }
      }

      // Click on nothing → clear
      clearSelection();
      selectSpot(null);
      setPopupInfo(null);
    },
    [
      filteredZones,
      protectedAreas,
      spots,
      selectZone,
      clearSelection,
      selectSpot,
      isLocationStep,
      updateDraftSpot,
      setSpotFormStep,
    ]
  );

  // River marker click
  const handleRiverClick = useCallback((river: RiverMouth) => {
    setPopupInfo({ type: "river", river });
  }, []);

  // Close popup
  const handleClosePopup = useCallback(() => {
    clearSelection();
    selectSpot(null);
    setPopupInfo(null);
  }, [clearSelection, selectSpot]);

  // Track viewport
  const handleMove = useCallback(
    (e: ViewStateChangeEvent) => {
      setViewport({
        latitude: e.viewState.latitude,
        longitude: e.viewState.longitude,
        zoom: e.viewState.zoom,
      });
    },
    [setViewport]
  );

  // Determine cursor
  const cursor = isLocationStep
    ? "crosshair"
    : hoveredZoneId || hoveredSpot
      ? "pointer"
      : "";

  return (
    <Map
      ref={mapRef}
      initialViewState={INITIAL_VIEW}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={handleMove}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      interactiveLayerIds={[
        "zones-circle",
        "protected-fill",
        "spots-unclustered",
        "spots-clusters",
      ]}
      cursor={cursor}
      attributionControl={false}
    >
      {/* Attribution — bottom-left, compact */}
      <AttributionControl position="bottom-left" compact />

      {/* Layer order: Protected (bottom) → Rivers → Zones → Spots (top) */}
      <ProtectedLayer protectedAreas={protectedAreas} />
      <RiverLayer riverMouths={riverMouths} onRiverClick={handleRiverClick} />
      <ZoneLayer geojson={zonesGeoJSON} hoveredZoneId={hoveredZoneId} />
      <SpotLayer spots={spots} />

      {/* Draft marker for spot creation */}
      <DraftMarker />

      {/* Draggable marker for admin spot repositioning */}
      <DraggableSpotMarker />

      {/* Popups */}
      {popupInfo?.type === "zone" && (
        <ZonePopup
          zone={popupInfo.zone}
          nearbyProtected={popupInfo.nearbyProtected}
          onClose={handleClosePopup}
        />
      )}
      {popupInfo?.type === "protected" && (
        <ProtectedPopup area={popupInfo.area} onClose={handleClosePopup} />
      )}
      {popupInfo?.type === "river" && (
        <RiverPopup river={popupInfo.river} onClose={handleClosePopup} />
      )}
    </Map>
  );
}

/** Inline river popup — simple info display */
function RiverPopup({
  river,
  onClose,
}: {
  river: RiverMouth;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Popup
      longitude={river.coordinates[0]}
      latitude={river.coordinates[1]}
      onClose={onClose}
      closeOnClick={false}
      maxWidth="240px"
      offset={16}
    >
      <div className="min-w-[200px] overflow-hidden rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full border-2 border-dashed border-river bg-river/20" />
          <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-text-primary">
            {river.name}
          </h3>
        </div>
        <p className="mt-2 text-[11px] text-text-secondary">
          <span className="text-text-tertiary">{t("river.upstreamPopulation")} </span>
          {river.populationUpstream}
        </p>
        <p className="mt-1 text-[11px] text-text-secondary">
          <span className="text-text-tertiary">{t("river.majorCity")} </span>
          {river.majorCity}
        </p>
      </div>
    </Popup>
  );
}
