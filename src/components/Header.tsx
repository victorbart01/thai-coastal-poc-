"use client";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";

interface HeaderProps {
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <header className="relative z-20 flex h-12 shrink-0 items-center border-b border-white/[0.06] bg-ocean-900 px-4">
      {/* Tablet sidebar toggle — visible only on md < lg */}
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="mr-3 hidden rounded-md p-1.5 text-text-secondary transition-colors duration-200 hover:bg-ocean-700 hover:text-text-primary md:block lg:hidden"
          aria-label={sidebarOpen ? "Fermer le panneau" : "Ouvrir le panneau"}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeftOpen className="h-4 w-4" />
          )}
        </button>
      )}

      {/* Logo */}
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-glass-deep to-glass-bright shadow-[0_0_12px_rgba(6,182,212,0.25)]">
        <span className="text-base leading-none">🌊</span>
      </div>

      {/* Title */}
      <h1 className="ml-3 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-text-primary">
        Sea Glass Probability Map
      </h1>

      {/* Badge */}
      <span className="ml-3 hidden rounded-full border border-glass-deep/30 bg-glass-deep/10 px-2.5 py-0.5 font-[family-name:var(--font-display)] text-[10px] font-medium tracking-wider text-glass-deep sm:inline-block">
        PoC THAÏLANDE
      </span>

      {/* Subtle glow line under header */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-glass-deep/20 to-transparent" />
    </header>
  );
}
