"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SpotPhoto } from "@/lib/types";

interface PhotoCarouselProps {
  photos: SpotPhoto[];
  title: string;
}

export function PhotoCarousel({ photos, title }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    startX: number;
    startTime: number;
    hasDragged: boolean;
  } | null>(null);

  const total = photos.length;

  const goTo = useCallback(
    (n: number) => setIndex(Math.max(0, Math.min(n, total - 1))),
    [total],
  );

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return; // left click only
    const el = containerRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    dragState.current = {
      startX: e.clientX,
      startTime: Date.now(),
      hasDragged: false,
    };
    setDragging(true);
    setDragOffset(0);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const ds = dragState.current;
    if (!ds) return;
    const dx = e.clientX - ds.startX;
    if (Math.abs(dx) > 3) ds.hasDragged = true;
    setDragOffset(dx);
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const el = containerRef.current;
      if (el) el.releasePointerCapture(e.pointerId);

      const ds = dragState.current;
      if (!ds) {
        setDragging(false);
        setDragOffset(0);
        return;
      }

      const dx = e.clientX - ds.startX;
      const dt = Math.max(1, Date.now() - ds.startTime);
      const velocity = dx / dt; // px/ms
      const width = el?.offsetWidth ?? 1;

      let newIndex = index;
      if (Math.abs(velocity) > 0.4) {
        // Flick
        newIndex = velocity < 0 ? index + 1 : index - 1;
      } else if (Math.abs(dx) > width * 0.25) {
        // Drag past 25% threshold
        newIndex = dx < 0 ? index + 1 : index - 1;
      }

      dragState.current = null;
      setDragging(false);
      setDragOffset(0);
      goTo(newIndex);
    },
    [index, goTo],
  );

  const onPointerCancel = useCallback(() => {
    dragState.current = null;
    setDragging(false);
    setDragOffset(0);
  }, []);

  if (total === 0) return null;

  return (
    <div
      className="group relative aspect-[4/3] overflow-hidden"
      ref={containerRef}
      style={total > 1 ? { touchAction: "pan-y" } : undefined}
      onPointerDown={total > 1 ? onPointerDown : undefined}
      onPointerMove={total > 1 ? onPointerMove : undefined}
      onPointerUp={total > 1 ? onPointerUp : undefined}
      onPointerCancel={total > 1 ? onPointerCancel : undefined}
    >
      {/* Sliding strip */}
      <div
        className="flex h-full"
        style={{
          transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
          transition: dragging ? "none" : "transform 300ms cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {photos.map((photo, i) => (
          <div key={photo.id} className="w-full shrink-0">
            <Image
              src={photo.url}
              alt={`${title} — photo ${i + 1}`}
              width={448}
              height={336}
              draggable={false}
              className="pointer-events-none aspect-[4/3] w-full select-none object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Photo counter badge */}
      {total > 1 && (
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 backdrop-blur-sm">
          <span className="font-[family-name:var(--font-display)] text-[10px] text-white/90">
            {index + 1}/{total}
          </span>
        </div>
      )}

      {/* Arrow buttons (desktop hover) */}
      {total > 1 && (
        <>
          {index > 0 && (
            <button
              onClick={() => goTo(index - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
          )}
          {index < total - 1 && (
            <button
              onClick={() => goTo(index + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          )}
        </>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
