"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useUser } from "@/lib/useUser";
import { useTranslation } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { useMapStore } from "@/store/useMapStore";

export function AuthButton() {
  const { user, loading } = useUser();
  const { t } = useTranslation();
  const openSignupModal = useMapStore((s) => s.openSignupModal);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (loading) {
    return (
      <div className="h-7 w-16 animate-pulse rounded-full bg-white/20" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={openSignupModal}
        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-wide text-white transition-all duration-200 hover:bg-white/20"
      >
        {t("auth.signIn")}
      </button>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const displayName =
    user.user_metadata?.full_name ?? user.user_metadata?.name ?? "User";

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/30 transition-all duration-200 hover:border-white/60"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xs font-semibold text-white">
            {displayName[0]?.toUpperCase()}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-black/90 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <Link
            href={`/profile/${user.id}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <User className="h-3.5 w-3.5" />
            {t("auth.profile")}
          </Link>
          <div className="mx-3 h-px bg-white/10" />
          <button
            onClick={async () => {
              setOpen(false);
              const supabase = createClient();
              await supabase.auth.signOut();
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
            {t("auth.signOut")}
          </button>
        </div>
      )}
    </div>
  );
}
