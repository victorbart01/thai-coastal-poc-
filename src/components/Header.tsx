"use client";

import { PanelRightOpen, PanelRightClose } from "lucide-react";
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
    <header className="glass-header fixed inset-x-0 top-0 z-10 flex h-12 items-center border-b border-black/[0.06] px-4">
      {/* Logo */}
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-glass-deep to-accent-pink shadow-[0_2px_8px_rgba(6,182,212,0.2)]">
        <span className="text-base leading-none">🌊</span>
      </div>

      {/* Title */}
      <h1 className="ml-3 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-text-primary">
        Sea Glass Interactive Map
      </h1>

      {/* Badge */}
      <span className="ml-3 hidden rounded-full bg-gradient-to-r from-glass-deep/20 to-accent-pink/20 px-2.5 py-0.5 font-[family-name:var(--font-display)] text-[10px] font-medium tracking-wider text-accent-pink sm:inline-block">
        BETA
      </span>

      {/* Thailand only label */}
      <span className="ml-2 hidden text-[10px] text-text-tertiary sm:inline-block">
        {t("header.thailandOnly")}
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Auth button */}
      <AuthButton />

      {/* Separator */}
      <div className="mx-2 h-4 w-px bg-black/[0.06]" />

      {/* Language switcher */}
      <div className="flex items-center gap-0.5 rounded-full border border-black/[0.08] bg-black/[0.04] p-0.5">
        {(["en", "th"] as Locale[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLocale(lang)}
            className={`rounded-full px-2.5 py-1 font-[family-name:var(--font-display)] text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${
              locale === lang
                ? "bg-gradient-to-r from-glass-deep/30 to-accent-pink/30 text-white shadow-[0_1px_4px_rgba(6,182,212,0.15)]"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Separator */}
      <div className="mx-2 h-4 w-px bg-black/[0.06]" />

      {/* Tablet sidebar toggle — visible only on md < lg, now on the right */}
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="hidden rounded-md p-1.5 text-text-secondary transition-colors duration-200 hover:bg-black/[0.06] hover:text-text-primary md:block lg:hidden"
          aria-label={sidebarOpen ? t("header.closePanel") : t("header.openPanel")}
        >
          {sidebarOpen ? (
            <PanelRightClose className="h-4 w-4" />
          ) : (
            <PanelRightOpen className="h-4 w-4" />
          )}
        </button>
      )}

      {/* Subtle glow line under header */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-pink/30 to-transparent" />
    </header>
  );
}
