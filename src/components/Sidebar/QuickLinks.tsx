"use client";

import Link from "next/link";
import { useUser } from "@/lib/useUser";
import { useTranslation } from "@/lib/i18n";

export function QuickLinks() {
  const { user } = useUser();
  const { t } = useTranslation();

  const links = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.shop"), href: "/shop" },
    { label: t("nav.forum"), href: "/forum" },
    user
      ? { label: t("nav.dashboard"), href: `/profile/${user.id}` }
      : { label: t("nav.signUp"), href: "/about" },
  ];

  return (
    <div className="flex flex-wrap gap-1.5">
      {links.map((link) => (
        <Link
          key={link.href + link.label}
          href={link.href}
          className="rounded-full border border-black/[0.12] bg-white/60 px-3 py-1.5 text-[11px] font-semibold text-text-secondary shadow-sm transition-all duration-200 hover:border-black/[0.18] hover:bg-white/80 hover:text-text-primary"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
