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
          className="rounded-full border border-black/[0.08] bg-black/[0.03] px-3 py-1.5 text-[11px] font-medium text-text-secondary transition-all duration-200 hover:border-black/[0.12] hover:bg-black/[0.06] hover:text-text-primary"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
