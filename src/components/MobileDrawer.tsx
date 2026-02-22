"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronUp } from "lucide-react";
import type { SeaGlassZone, ProtectedArea, Spot } from "@/lib/types";
import { StatsPanel } from "./Sidebar/StatsPanel";
import { LegendPanel } from "./Sidebar/LegendPanel";
import { FiltersPanel } from "./Sidebar/FiltersPanel";
import { TopSpotsPanel } from "./Sidebar/TopSpotsPanel";
import { RecentFindsPanel } from "./Sidebar/RecentFindsPanel";
import { MethodologyPanel } from "./Sidebar/MethodologyPanel";

interface MobileDrawerProps {
  zones: SeaGlassZone[];
  protectedAreas: ProtectedArea[];
  spots: Spot[];
}

const COLLAPSED_HEIGHT = 30;
const EXPANDED_HEIGHT = 80;

export function MobileDrawer({ zones, protectedAreas, spots }: MobileDrawerProps) {
  const [sheetHeight, setSheetHeight] = useState(COLLAPSED_HEIGHT);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startY: number; startHeight: number } | null>(null);

  const isExpanded = sheetHeight > (COLLAPSED_HEIGHT + EXPANDED_HEIGHT) / 2;

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      dragRef.current = {
        startY: e.touches[0].clientY,
        startHeight: sheetHeight,
      };
    },
    [sheetHeight]
  );

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragRef.current) return;
    const deltaY = dragRef.current.startY - e.touches[0].clientY;
    const deltaPercent = (deltaY / window.innerHeight) * 100;
    const newHeight = Math.min(
      EXPANDED_HEIGHT,
      Math.max(10, dragRef.current.startHeight + deltaPercent)
    );
    setSheetHeight(newHeight);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!dragRef.current) return;
    setIsDragging(false);
    const mid = (COLLAPSED_HEIGHT + EXPANDED_HEIGHT) / 2;
    setSheetHeight(sheetHeight > mid ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT);
    dragRef.current = null;
  }, [sheetHeight]);

  const toggleSheet = useCallback(() => {
    setSheetHeight(isExpanded ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT);
  }, [isExpanded]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 flex flex-col rounded-t-2xl border-t border-white/[0.06] bg-ocean-900 shadow-[0_-8px_32px_rgba(0,0,0,0.4)] ${
        isDragging ? "" : "transition-[height] duration-300 ease-out"
      }`}
      style={{ height: `${sheetHeight}vh` }}
    >
      {/* Grab handle */}
      <div
        className="flex shrink-0 cursor-grab items-center justify-center pb-2 pt-3 active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={toggleSheet}
      >
        <div className="h-1 w-10 rounded-full bg-ocean-500 transition-colors duration-200 active:bg-glass-deep" />
      </div>

      {/* Expand hint */}
      <div className="flex items-center justify-center pb-2">
        <ChevronUp
          className={`h-4 w-4 text-text-tertiary transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Content */}
      <div className="sidebar-scroll flex-1 space-y-3 overflow-y-auto px-3 pb-8">
        <StatsPanel zones={zones} protectedAreas={protectedAreas} />
        <LegendPanel />
        <FiltersPanel />
        <TopSpotsPanel zones={zones} />
        <RecentFindsPanel spots={spots} />
        <MethodologyPanel />
      </div>
    </div>
  );
}
