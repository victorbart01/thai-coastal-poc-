"use client";

import Image from "next/image";
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
    <header className="fixed inset-x-0 top-0 z-10 flex h-12 items-center gap-2 bg-black px-4 sm:gap-0">
      {/* Logo */}
      <div className="flex items-center gap-1.5">
        <Image
          src="/logo_pin_sgm.png"
          alt="Seaglass logo"
          width={28}
          height={28}
        />
        <span className="font-[family-name:var(--font-logo)] text-xl tracking-tight text-white">
          <span className="font-bold">Seaglass</span>
          <span className="font-normal">map</span>
        </span>
        <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/70">
          beta
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Auth button */}
      <AuthButton />

      {/* Separator — hidden on mobile */}
      <div className="mx-2 hidden h-4 w-px bg-white/30 sm:block" />

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

      {/* Separator — hidden on mobile */}
      <div className="mx-2 hidden h-4 w-px bg-white/30 sm:block" />

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
