"use client";

import Link from "next/link";
import { useUser } from "@/lib/useUser";
import { useTranslation } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";

export function AuthButton() {
  const { user, loading } = useUser();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="h-7 w-16 animate-pulse rounded-full bg-white/20" />
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
    <div className="flex items-center gap-2.5">
      <Link
        href={`/profile/${user.id}`}
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
      </Link>
      <button
        onClick={async () => {
          const supabase = createClient();
          await supabase.auth.signOut();
        }}
        className="font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-wide text-white/70 transition-colors duration-200 hover:text-white"
      >
        {t("auth.signOut")}
      </button>
    </div>
  );
}
