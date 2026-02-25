"use client";

import Link from "next/link";
import { useUser } from "@/lib/useUser";
import { useTranslation } from "@/lib/i18n";
import { useMapStore } from "@/store/useMapStore";

export function QuickLinks() {
  const { user } = useUser();
  const { t } = useTranslation();
  const openSignupModal = useMapStore((s) => s.openSignupModal);

  const linkClass =
    "rounded-full border border-black/[0.12] bg-white/60 px-3 py-1.5 text-[11px] font-semibold text-text-secondary shadow-sm transition-all duration-200 hover:border-black/[0.18] hover:bg-white/80 hover:text-text-primary";

  const navLinks = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.shop"), href: "/shop" },
    { label: t("nav.forum"), href: "/forum" },
  ];

  return (
    <div className="flex flex-wrap gap-1.5">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </Link>
      ))}
      {user ? (
        <Link href={`/profile/${user.id}`} className={linkClass}>
          {t("nav.dashboard")}
        </Link>
      ) : (
        <button onClick={openSignupModal} className={linkClass}>
          {t("nav.signUp")}
        </button>
      )}
    </div>
  );
}
