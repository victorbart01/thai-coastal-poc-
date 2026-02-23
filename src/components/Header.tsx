"use client";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useMapStore } from "@/store/useMapStore";
import type { Locale } from "@/lib/i18n";
import { AuthButton } from "@/components/AuthButton";

interface HeaderProps {
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  const { t, locale } = useTranslation();
  const setLocale = useMapStore((s) => s.setLocale);

  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-12 items-center px-4" style={{ backgroundColor: "#9AC8D6" }}>
      {/* Logo */}
      <span className="font-[family-name:var(--font-logo)] text-xl tracking-tight text-white">
        <span className="font-bold">Seeglass</span>
        <span className="font-normal">map</span>
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Auth button */}
      <AuthButton />

      {/* Separator */}
      <div className="mx-2 h-4 w-px bg-white/30" />

      {/* Language switcher */}
      <div className="flex items-center gap-0.5 rounded-full border border-white/20 bg-white/10 p-0.5">
        {(["en", "th"] as Locale[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLocale(lang)}
            className={`rounded-full px-2.5 py-1 font-[family-name:var(--font-display)] text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${
              locale === lang
                ? "bg-white/25 text-white shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Separator */}
      <div className="mx-2 h-4 w-px bg-white/30" />

      {/* Tablet sidebar toggle — visible only on md < lg, now on the right */}
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="hidden rounded-md p-1.5 text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white md:block lg:hidden"
          aria-label={sidebarOpen ? t("header.closePanel") : t("header.openPanel")}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeftOpen className="h-4 w-4" />
          )}
        </button>
      )}
    </header>
  );
}
