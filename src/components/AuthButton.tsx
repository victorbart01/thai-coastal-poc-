"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@/lib/useUser";
import { useTranslation } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";

export function AuthButton() {
  const { user, loading } = useUser();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (loading) {
    return (
      <div className="h-7 w-16 animate-pulse rounded-full bg-white/[0.06]" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={async () => {
          const supabase = createClient();
          await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });
        }}
        className="rounded-full border border-white/[0.08] bg-ocean-800 px-3 py-1 font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-wide text-text-secondary transition-all duration-200 hover:bg-ocean-700 hover:text-text-primary"
      >
        {t("auth.signIn")}
      </button>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const displayName =
    user.user_metadata?.full_name ?? user.user_metadata?.name ?? "User";
  const email = user.email;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] transition-all duration-200 hover:border-glass-deep/40"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xs font-semibold text-text-secondary">
            {displayName[0]?.toUpperCase()}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border border-white/[0.08] bg-ocean-800 shadow-xl">
          <div className="border-b border-white/[0.06] px-4 py-3">
            <p className="truncate text-sm font-medium text-text-primary">
              {displayName}
            </p>
            {email && (
              <p className="truncate text-xs text-text-tertiary">{email}</p>
            )}
          </div>
          <button
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              setOpen(false);
            }}
            className="w-full px-4 py-2.5 text-left text-sm text-text-secondary transition-colors duration-150 hover:bg-white/[0.04] hover:text-text-primary"
          >
            {t("auth.signOut")}
          </button>
        </div>
      )}
    </div>
  );
}
