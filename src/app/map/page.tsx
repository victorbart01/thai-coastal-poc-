"use client";

import { useState, useEffect } from "react";
import { MapContainer } from "@/components/Map/MapContainer";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { MobileDrawer } from "@/components/MobileDrawer";
import type { SnapPoint } from "@/components/MobileDrawer";
import { BottomTabBar } from "@/components/BottomTabBar";
import type { TabId } from "@/components/BottomTabBar";
import { SpotFAB } from "@/components/SpotFAB";
import { SpotForm } from "@/components/SpotForm/SpotForm";
import { SpotDetailPanel } from "@/components/SpotDetailPanel";
import { OnboardingCoachMarks } from "@/components/OnboardingCoachMarks";
import { SignupModal } from "@/components/SignupModal";
import { SeaGlassLoader } from "@/components/SeaGlassLoader";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { useZones } from "@/lib/useZones";
import { useSpots } from "@/lib/useSpots";
import { useUser } from "@/lib/useUser";
import { useTranslation } from "@/lib/i18n";
import { useMapStore } from "@/store/useMapStore";
import { useRealtimeNotifications } from "@/lib/useRealtimeNotifications";

export default function MapPage() {
  const { filteredZones, protectedAreas, riverMouths, loading } = useZones();
  const { spots, allSpots, refetch: refetchSpots } = useSpots();
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("discover");
  const [drawerSnap, setDrawerSnap] = useState<SnapPoint | undefined>(undefined);
  const { t } = useTranslation();
  const selectSpot = useMapStore((s) => s.selectSpot);
  const flyTo = useMapStore((s) => s.flyTo);
  useRealtimeNotifications(user?.id);

  useEffect(() => {
    if (allSpots.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const spotId = params.get("spot");
    if (!spotId) return;

    const spot = allSpots.find((s) => s.id === spotId);
    if (spot) {
      selectSpot(spot);
      flyTo({ latitude: spot.latitude, longitude: spot.longitude, zoom: 14 });
    }
  }, [allSpots, selectSpot, flyTo]);

  if (loading) {
    return <SeaGlassLoader message={t("loading")} />;
  }

  return (
    <div className="relative h-screen overflow-hidden bg-ocean-950">
      <div className="absolute inset-0 z-0" data-onboarding="map">
        <MapContainer
          filteredZones={filteredZones}
          protectedAreas={protectedAreas}
          riverMouths={riverMouths}
          spots={spots}
        />
      </div>

      <SiteNavbar />

      {/* Tablet sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed right-4 top-16 z-20 hidden rounded-lg bg-navy-900/80 p-2 text-white/80 shadow-lg backdrop-blur-sm transition-colors hover:bg-navy-900 hover:text-white md:block lg:hidden"
        aria-label={sidebarOpen ? t("header.closePanel") : t("header.openPanel")}
      >
        {sidebarOpen ? (
          <PanelLeftClose className="h-5 w-5" />
        ) : (
          <PanelLeftOpen className="h-5 w-5" />
        )}
      </button>

      {/* Desktop sidebar */}
      <div className="absolute left-0 top-14 bottom-0 z-10 hidden w-[360px] lg:block" data-onboarding="sidebar">
        <Sidebar spots={allSpots} />
      </div>

      {/* Tablet sidebar — slide-over */}
      {sidebarOpen && (
        <>
          <div
            className="animate-fade-in fixed inset-0 z-20 hidden bg-black/40 backdrop-blur-[2px] md:block lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="animate-sidebar-enter fixed inset-y-14 left-0 z-30 hidden w-[360px] shadow-2xl md:block lg:hidden">
            <Sidebar spots={allSpots} />
          </div>
        </>
      )}

      {/* Mobile drawer + tab bar */}
      <div className="md:hidden">
        <MobileDrawer
          spots={allSpots}
          snapTo={drawerSnap}
          onSnapChange={() => setDrawerSnap(undefined)}
          onSpotUpdated={refetchSpots}
        />
        <BottomTabBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === "discover") setDrawerSnap("half");
          }}
        />
      </div>

      <SpotDetailPanel onSpotUpdated={refetchSpots} />

      <SpotFAB isLoggedIn={!!user} />
      {user && (
        <SpotForm userId={user.id} onPublished={refetchSpots} />
      )}

      {user && <OnboardingCoachMarks userId={user.id} />}

      <SignupModal />
    </div>
  );
}
