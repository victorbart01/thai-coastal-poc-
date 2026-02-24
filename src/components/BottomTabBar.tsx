"use client";

import { Compass, PlusCircle, User } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useMapStore } from "@/store/useMapStore";
import { useUser } from "@/lib/useUser";
import { useRouter } from "next/navigation";

export type TabId = "discover" | "contribute" | "profile";

interface BottomTabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  const { t } = useTranslation();
  const showSpotForm = useMapStore((s) => s.showSpotForm);
  const openSpotForm = useMapStore((s) => s.openSpotForm);
  const { user } = useUser();
  const router = useRouter();

  if (showSpotForm) return null;

  const tabs: { id: TabId; icon: typeof Compass; labelKey: string }[] = [
    { id: "discover", icon: Compass, labelKey: "tab.discover" },
    { id: "contribute", icon: PlusCircle, labelKey: "tab.contribute" },
    { id: "profile", icon: User, labelKey: "tab.profile" },
  ];

  const openSignupModal = useMapStore((s) => s.openSignupModal);

  const handleTab = (tab: TabId) => {
    if (tab === "contribute") {
      if (user) openSpotForm();
      else openSignupModal();
      return;
    }
    if (tab === "profile") {
      if (user) router.push(`/profile/${user.id}`);
      else openSignupModal();
      return;
    }
    onTabChange(tab);
  };

  return (
    <nav className="glass-header fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div
        className="flex items-center justify-around"
        style={{
          height: 56,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {tabs.map(({ id, icon: Icon, labelKey }) => {
          const isActive = id === activeTab && id !== "contribute";
          return (
            <button
              key={id}
              onClick={() => handleTab(id)}
              data-onboarding={id === "contribute" ? "tab-contribute" : undefined}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors ${
                isActive ? "text-glass-deep" : "text-text-secondary"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium leading-tight">
                {t(labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
