"use client";

import { useState, useEffect } from "react";
import { MapContainer } from "@/components/Map/MapContainer";
import { Header } from "@/components/Header";
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
import { useZones } from "@/lib/useZones";
import { useSpots } from "@/lib/useSpots";
import { useUser } from "@/lib/useUser";
import { useTranslation } from "@/lib/i18n";
import { useMapStore } from "@/store/useMapStore";
import { useRealtimeNotifications } from "@/lib/useRealtimeNotifications";

export default function Home() {
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

  // Deep-link: ?spot=<id> → flyTo + selectSpot
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
      {/* Map — fullscreen behind everything */}
      <div className="absolute inset-0 z-0" data-onboarding="map">
        <MapContainer
          filteredZones={filteredZones}
          protectedAreas={protectedAreas}
          riverMouths={riverMouths}
          spots={spots}
        />
      </div>

      {/* Header — fixed glass overlay */}
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Desktop sidebar — always visible on lg+, floating left */}
      <div className="absolute left-0 top-12 bottom-0 z-10 hidden w-[360px] lg:block" data-onboarding="sidebar">
        <Sidebar spots={allSpots} />
      </div>

      {/* Tablet sidebar — slide-over overlay on md to lg, from left */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="animate-fade-in fixed inset-0 z-20 hidden bg-black/40 backdrop-blur-[2px] md:block lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar panel — from left */}
          <div className="animate-sidebar-enter fixed inset-y-12 left-0 z-30 hidden w-[360px] shadow-2xl md:block lg:hidden">
            <Sidebar spots={allSpots} />
          </div>
        </>
      )}

      {/* Mobile drawer + tab bar — visible only on < md */}
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

      {/* Spot detail panel (desktop/tablet) */}
      <SpotDetailPanel onSpotUpdated={refetchSpots} />

      {/* Spot creation overlays */}
      <SpotFAB isLoggedIn={!!user} />
      {user && (
        <SpotForm userId={user.id} onPublished={refetchSpots} />
      )}

      {/* Onboarding coach marks — first-time users only */}
      {user && <OnboardingCoachMarks userId={user.id} />}

      {/* Signup modal */}
      <SignupModal />
    </div>
  );
}
