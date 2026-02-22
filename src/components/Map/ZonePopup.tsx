"use client";

import { useState } from "react";
import Image from "next/image";
import { Popup } from "react-map-gl";
import { AlertTriangle, Camera, X, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import type { SeaGlassZone, ProtectedArea } from "@/lib/types";
import { useZonePhotos } from "@/lib/useZonePhotos";
import {
  getScoreColor,
  getScoreLabel,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/colors";

interface ZonePopupProps {
  zone: SeaGlassZone;
  nearbyProtected: ProtectedArea | null;
  onClose: () => void;
}

const SUBSCORE_LABELS: {
  key: keyof SeaGlassZone["subscores"];
  label: string;
}[] = [
  { key: "historical", label: "Historique" },
  { key: "morphology", label: "Morphologie" },
  { key: "river", label: "Fluvial" },
  { key: "ocean", label: "Océanique" },
  { key: "population", label: "Population" },
];

/**
 * Rich popup displayed when a zone circle is clicked.
 * Shows photos, score, animated sub-score bars, category badge, notes,
 * and a warning if the zone falls within a protected area.
 */
export function ZonePopup({ zone, nearbyProtected, onClose }: ZonePopupProps) {
  const color = getScoreColor(zone.score);
  const label = getScoreLabel(zone.score);
  const categoryColor = CATEGORY_COLORS[zone.category];
  const { photos, loading: photosLoading } = useZonePhotos(zone);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <Popup
        longitude={zone.coordinates[0]}
        latitude={zone.coordinates[1]}
        onClose={onClose}
        closeOnClick={false}
        maxWidth="320px"
        offset={16}
      >
        <div
          className="min-w-[280px] rounded-xl"
          style={{ borderLeft: `3px solid ${color}` }}
        >
          {/* Photo loading skeleton */}
          {photosLoading && (
            <div className="flex h-36 w-full items-center justify-center rounded-t-xl bg-ocean-800">
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-glass-bright/30 border-t-glass-bright" />
                <span className="text-[10px] text-text-tertiary">Chargement des photos...</span>
              </div>
            </div>
          )}

          {/* No photos fallback */}
          {!photosLoading && photos.length === 0 && zone.placeQuery && (
            <div className="flex h-24 w-full items-center justify-center rounded-t-xl bg-ocean-800/50">
              <div className="flex items-center gap-2 text-text-tertiary">
                <ImageOff className="h-4 w-4" />
                <span className="text-[10px]">Aucune photo disponible</span>
              </div>
            </div>
          )}

          {/* Photo gallery */}
          {!photosLoading && photos.length > 0 && (
            <div
              className="group relative cursor-pointer overflow-hidden rounded-t-xl"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={photos[photoIndex]}
                alt={`${zone.name} — photo ${photoIndex + 1}`}
                width={320}
                height={144}
                className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-700/80 via-transparent to-transparent" />
              {/* Photo count badge */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 backdrop-blur-sm">
                <Camera className="h-3 w-3 text-white/80" />
                <span className="font-[family-name:var(--font-display)] text-[10px] text-white/80">
                  {photoIndex + 1}/{photos.length}
                </span>
              </div>
              {/* Navigation arrows (if multiple photos) */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
                    }}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-3.5 w-3.5 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoIndex((i) => (i + 1) % photos.length);
                    }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-white" />
                  </button>
                </>
              )}
            </div>
          )}

          <div className="p-4">
            {/* Header */}
            <h3 className="pr-4 font-[family-name:var(--font-display)] text-sm font-semibold leading-snug text-text-primary">
              {zone.name}
            </h3>

            {/* Score display */}
            <div className="mt-2.5 flex items-baseline gap-2">
              <span
                className="font-[family-name:var(--font-display)] text-2xl font-bold"
                style={{ color }}
              >
                {Math.round(zone.score * 100)}%
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: `${color}15`,
                  color,
                }}
              >
                {label}
              </span>
            </div>

            {/* Sub-scores with animated bars */}
            <div className="mt-3 space-y-2">
              {SUBSCORE_LABELS.map(({ key, label: subLabel }) => {
                const value = zone.subscores[key];
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="w-[72px] shrink-0 text-[10px] text-text-tertiary">
                      {subLabel}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ocean-600">
                      <div
                        className="animate-fill-bar h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${value * 100}%`,
                          backgroundColor: color,
                          opacity: 0.5 + value * 0.5,
                        }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right font-[family-name:var(--font-display)] text-[10px] text-text-secondary">
                      {Math.round(value * 100)}%
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Category badge */}
            <div className="mt-3">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: `${categoryColor}15`,
                  color: categoryColor,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: categoryColor }}
                />
                {CATEGORY_LABELS[zone.category]}
              </span>
            </div>

            {/* Notes */}
            <p className="mt-2.5 text-[11px] leading-relaxed text-text-secondary">
              {zone.notes}
            </p>

            {/* Protected area warning */}
            {nearbyProtected && (
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-danger/20 bg-danger/5 p-2.5">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" />
                <div>
                  <p className="text-[11px] font-medium text-danger">
                    Zone protégée à proximité
                  </p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-danger/70">
                    {nearbyProtected.name} —{" "}
                    {nearbyProtected.status === "prohibited"
                      ? "collecte strictement interdite"
                      : "collecte restreinte"}
                    . {nearbyProtected.legalBasis}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Popup>

      {/* Lightbox overlay */}
      {lightboxOpen && photos.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
                }}
                className="absolute left-4 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPhotoIndex((i) => (i + 1) % photos.length);
                }}
                className="absolute right-4 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}

          <Image
            src={photos[photoIndex]}
            alt={`${zone.name} — photo ${photoIndex + 1}`}
            width={1200}
            height={800}
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            unoptimized
          />

          {/* Caption */}
          <div className="absolute bottom-6 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm">
            <span className="font-[family-name:var(--font-display)] text-sm text-white">
              {zone.name}
            </span>
            <span className="ml-2 text-xs text-white/60">
              {photoIndex + 1} / {photos.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
