"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import type { Spot } from "@/lib/types";
import { useMapStore } from "@/store/useMapStore";
import { useNearbySpots } from "@/lib/useNearbySpots";
import { TaglineSection } from "./Sidebar/TaglineSection";
import { SearchBar } from "./Sidebar/SearchBar";
import { QuickLinks } from "./Sidebar/QuickLinks";
import { PopularSpotsPanel } from "./Sidebar/PopularSpotsPanel";
import { ActivityFeed } from "./Sidebar/ActivityFeed";
import { LeaderboardPanel } from "./Sidebar/LeaderboardPanel";
import { MapToggles } from "./Sidebar/MapToggles";

export type SnapPoint = "peek" | "half" | "full";

interface MobileDrawerProps {
  spots: Spot[];
  snapTo?: SnapPoint;
  onSnapChange?: (snap: SnapPoint) => void;
}

const TAB_BAR_HEIGHT = 56; // px, matches BottomTabBar
const PEEK_HEIGHT = 120;
const VELOCITY_THRESHOLD = 0.5; // px/ms — flick detection
const DRAG_AREA_HEIGHT = 48; // px — top region that is draggable

function getSnapHeights() {
  const vh = window.innerHeight;
  return {
    peek: PEEK_HEIGHT,
    half: vh * 0.5,
    full: vh * 0.9,
  };
}

function nearestSnap(height: number, snaps: Record<SnapPoint, number>): SnapPoint {
  let closest: SnapPoint = "peek";
  let minDist = Infinity;
  for (const [key, val] of Object.entries(snaps) as [SnapPoint, number][]) {
    const dist = Math.abs(height - val);
    if (dist < minDist) {
      minDist = dist;
      closest = key;
    }
  }
  return closest;
}

export function MobileDrawer({ spots, snapTo, onSnapChange }: MobileDrawerProps) {
  const showSpotForm = useMapStore((s) => s.showSpotForm);
  const nearbySpots = useNearbySpots(spots);
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    startY: number;
    startHeight: number;
    lastY: number;
    lastTime: number;
    isDragging: boolean;
    isScrollDrag: boolean; // true when dragging started from scroll interlock
  } | null>(null);
  const [currentSnap, setCurrentSnap] = useState<SnapPoint>("peek");
  const [isDragging, setIsDragging] = useState(false);
  const rafRef = useRef<number>(0);

  // Respond to parent snapTo prop changes
  useEffect(() => {
    if (!snapTo || !sheetRef.current) return;
    const snaps = getSnapHeights();
    sheetRef.current.style.height = `${snaps[snapTo]}px`;
    setCurrentSnap(snapTo);
  }, [snapTo]);

  // Initialize at peek height
  useEffect(() => {
    if (!sheetRef.current) return;
    sheetRef.current.style.height = `${PEEK_HEIGHT}px`;
  }, []);

  const animateToSnap = useCallback(
    (snap: SnapPoint) => {
      if (!sheetRef.current) return;
      const snaps = getSnapHeights();
      sheetRef.current.style.height = `${snaps[snap]}px`;
      setCurrentSnap(snap);
      onSnapChange?.(snap);
    },
    [onSnapChange]
  );

  // --- Touch handlers for drag area ---
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!sheetRef.current) return;
      const touch = e.touches[0];
      dragState.current = {
        startY: touch.clientY,
        startHeight: sheetRef.current.getBoundingClientRect().height,
        lastY: touch.clientY,
        lastTime: Date.now(),
        isDragging: true,
        isScrollDrag: false,
      };
      setIsDragging(true);
    },
    []
  );

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragState.current?.isDragging || !sheetRef.current) return;
    e.preventDefault();

    const touch = e.touches[0];
    const deltaY = dragState.current.startY - touch.clientY;
    const snaps = getSnapHeights();
    const newHeight = Math.min(
      snaps.full,
      Math.max(PEEK_HEIGHT * 0.5, dragState.current.startHeight + deltaY)
    );

    // DOM-direct update via rAF
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (sheetRef.current) {
        sheetRef.current.style.height = `${newHeight}px`;
      }
    });

    dragState.current.lastY = touch.clientY;
    dragState.current.lastTime = Date.now();
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!dragState.current?.isDragging || !sheetRef.current) return;
    cancelAnimationFrame(rafRef.current);

    const currentHeight = sheetRef.current.getBoundingClientRect().height;
    const velocity =
      (dragState.current.startY - dragState.current.lastY) /
      Math.max(1, Date.now() - dragState.current.lastTime + (Date.now() - dragState.current.lastTime === 0 ? 1 : 0));

    const snaps = getSnapHeights();
    let target: SnapPoint;

    if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
      // Flick: snap in the direction of the flick
      if (velocity > 0) {
        // Swiped up
        target = currentHeight > snaps.half ? "full" : "half";
      } else {
        // Swiped down
        target = currentHeight < snaps.half ? "peek" : "half";
      }
    } else {
      target = nearestSnap(currentHeight, snaps);
    }

    setIsDragging(false);
    dragState.current = null;
    animateToSnap(target);
  }, [animateToSnap]);

  // --- Content touch: drag sheet when not full, scroll interlock when full ---
  const handleContentTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!sheetRef.current) return;
      const touch = e.touches[0];

      if (currentSnap !== "full") {
        // Not at full → treat as sheet drag (same as handle)
        dragState.current = {
          startY: touch.clientY,
          startHeight: sheetRef.current.getBoundingClientRect().height,
          lastY: touch.clientY,
          lastTime: Date.now(),
          isDragging: true,
          isScrollDrag: false,
        };
        setIsDragging(true);
      } else {
        // At full → scroll interlock: wait for downward drag at scrollTop 0
        if (!contentRef.current || contentRef.current.scrollTop > 0) return;
        dragState.current = {
          startY: touch.clientY,
          startHeight: sheetRef.current.getBoundingClientRect().height,
          lastY: touch.clientY,
          lastTime: Date.now(),
          isDragging: false,
          isScrollDrag: true,
        };
      }
    },
    [currentSnap]
  );

  const handleContentTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragState.current || !sheetRef.current) return;
    const touch = e.touches[0];

    // Case 1: direct sheet drag (not full snap)
    if (!dragState.current.isScrollDrag && dragState.current.isDragging) {
      e.preventDefault();
      const deltaY = dragState.current.startY - touch.clientY;
      const snaps = getSnapHeights();
      const newHeight = Math.min(
        snaps.full,
        Math.max(PEEK_HEIGHT * 0.5, dragState.current.startHeight + deltaY)
      );

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (sheetRef.current) {
          sheetRef.current.style.height = `${newHeight}px`;
        }
      });

      dragState.current.lastY = touch.clientY;
      dragState.current.lastTime = Date.now();
      return;
    }

    // Case 2: scroll interlock (full snap)
    if (!dragState.current.isScrollDrag || !contentRef.current) return;
    const deltaY = touch.clientY - dragState.current.startY;

    if (deltaY > 0 && contentRef.current.scrollTop === 0) {
      if (!dragState.current.isDragging) {
        dragState.current.isDragging = true;
        setIsDragging(true);
      }
      e.preventDefault();

      const snaps = getSnapHeights();
      const newHeight = Math.max(
        PEEK_HEIGHT * 0.5,
        Math.min(snaps.full, dragState.current.startHeight - deltaY)
      );

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (sheetRef.current) {
          sheetRef.current.style.height = `${newHeight}px`;
        }
      });

      dragState.current.lastY = touch.clientY;
      dragState.current.lastTime = Date.now();
    }
  }, []);

  const handleContentTouchEnd = useCallback(() => {
    if (!dragState.current) return;

    // If we never actually started dragging (scroll interlock didn't activate)
    if (dragState.current.isScrollDrag && !dragState.current.isDragging) {
      dragState.current = null;
      return;
    }

    if (!dragState.current.isDragging || !sheetRef.current) {
      dragState.current = null;
      return;
    }

    cancelAnimationFrame(rafRef.current);

    const currentHeight = sheetRef.current.getBoundingClientRect().height;
    const isScrollInterlock = dragState.current.isScrollDrag;

    // Velocity: for scroll interlock direction is inverted
    const velocity = isScrollInterlock
      ? (dragState.current.lastY - dragState.current.startY) /
        Math.max(1, Date.now() - dragState.current.lastTime)
      : (dragState.current.startY - dragState.current.lastY) /
        Math.max(1, Date.now() - dragState.current.lastTime);

    const snaps = getSnapHeights();
    let target: SnapPoint;

    if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
      if (isScrollInterlock) {
        target = velocity > 0 ? (currentHeight < snaps.half ? "peek" : "half") : "full";
      } else {
        target = velocity > 0 ? (currentHeight > snaps.half ? "full" : "half") : (currentHeight < snaps.half ? "peek" : "half");
      }
    } else {
      target = nearestSnap(currentHeight, snaps);
    }

    setIsDragging(false);
    dragState.current = null;
    animateToSnap(target);
  }, [animateToSnap]);

  if (showSpotForm) return null;

  return (
    <div
      ref={sheetRef}
      data-onboarding="mobile-drawer"
      className={`glass-surface fixed inset-x-0 z-30 flex flex-col rounded-t-2xl border-t border-black/[0.06] shadow-[0_-4px_24px_rgba(0,0,0,0.08)] ${
        isDragging ? "" : "sheet-transition"
      }`}
      style={{
        bottom: `calc(${TAB_BAR_HEIGHT}px + env(safe-area-inset-bottom))`,
        height: PEEK_HEIGHT,
      }}
    >
      {/* Drag handle area — 48px tall */}
      <div
        className="flex shrink-0 cursor-grab flex-col items-center justify-center active:cursor-grabbing"
        style={{ height: DRAG_AREA_HEIGHT }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-1 w-10 rounded-full bg-black/10" />
      </div>

      {/* Scrollable content */}
      <div
        ref={contentRef}
        className={`sidebar-scroll flex-1 space-y-3 px-3 pb-8 ${
          currentSnap === "full" ? "overflow-y-auto" : "overflow-y-hidden"
        }`}
        onTouchStart={handleContentTouchStart}
        onTouchMove={handleContentTouchMove}
        onTouchEnd={handleContentTouchEnd}
      >
        <TaglineSection />
        <SearchBar />
        <QuickLinks />
        <PopularSpotsPanel spots={nearbySpots} />
        <ActivityFeed spots={nearbySpots} />
        <LeaderboardPanel spots={nearbySpots} />
        <MapToggles />
      </div>
    </div>
  );
}
