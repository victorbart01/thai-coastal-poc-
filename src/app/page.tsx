"use client";

import { useState } from "react";
import { MapContainer } from "@/components/Map/MapContainer";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { MobileDrawer } from "@/components/MobileDrawer";
import { useZones } from "@/lib/useZones";
import { useTranslation } from "@/lib/i18n";

export default function Home() {
  const { filteredZones, protectedAreas, riverMouths, loading } = useZones();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-ocean-950">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-glass-deep to-glass-bright shadow-[0_0_24px_rgba(6,182,212,0.3)]">
          <span className="animate-spin-slow text-xl">🌊</span>
        </div>
        <p className="font-[family-name:var(--font-display)] text-sm text-text-secondary">
          {t("loading")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-ocean-950">
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="relative flex flex-1 overflow-hidden">
        {/* Desktop sidebar — always visible on lg+ */}
        <div className="hidden w-[340px] shrink-0 lg:block">
          <Sidebar zones={filteredZones} protectedAreas={protectedAreas} />
        </div>

        {/* Tablet sidebar — slide-over overlay on md to lg */}
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="animate-fade-in fixed inset-0 z-20 hidden bg-black/40 backdrop-blur-[2px] md:block lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar panel */}
            <div className="animate-sidebar-enter fixed inset-y-12 left-0 z-30 hidden w-[340px] shadow-2xl md:block lg:hidden">
              <Sidebar
                zones={filteredZones}
                protectedAreas={protectedAreas}
              />
            </div>
          </>
        )}

        {/* Map */}
        <div className="flex-1">
          <MapContainer
            filteredZones={filteredZones}
            protectedAreas={protectedAreas}
            riverMouths={riverMouths}
          />
        </div>
      </div>

      {/* Mobile drawer — visible only on < md */}
      <div className="md:hidden">
        <MobileDrawer
          zones={filteredZones}
          protectedAreas={protectedAreas}
        />
      </div>
    </div>
  );
}
