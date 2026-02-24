"use client";

import { useState } from "react";
import { X, MapPin, Bookmark, MessageCircle, Trophy, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useTranslation } from "@/lib/i18n";
import { useMapStore } from "@/store/useMapStore";

const VALUE_PROPS = [
  { icon: MapPin, key: "signup.valueShare" },
  { icon: Bookmark, key: "signup.valueSave" },
  { icon: MessageCircle, key: "signup.valueComment" },
  { icon: Trophy, key: "signup.valueBadges" },
] as const;

export function SignupModal() {
  const { t } = useTranslation();
  const showSignupModal = useMapStore((s) => s.showSignupModal);
  const closeSignupModal = useMapStore((s) => s.closeSignupModal);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!showSignupModal) return null;

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      const supabase = createClient();
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { full_name: `${firstName} ${lastName}`.trim() },
        },
      });
      if (otpError) {
        setError(otpError.message);
      } else {
        setSent(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleResend = async () => {
    setSending(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { full_name: `${firstName} ${lastName}`.trim() },
        },
      });
      if (otpError) setError(otpError.message);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setSent(false);
    setEmail("");
    setError(null);
  };

  const handleClose = () => {
    closeSignupModal();
    setSent(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="animate-fade-in absolute inset-0 bg-ocean-950/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal card */}
      <div className="animate-panel-enter-right relative w-full max-w-md">
        <div className="glass-card max-h-[90dvh] overflow-y-auto rounded-3xl p-6 shadow-2xl sm:p-8">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-black/[0.06] hover:text-text-primary"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-glass-deep/20 to-accent-pink/20">
              <Sparkles className="h-7 w-7 text-accent-pink" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-xl font-bold text-text-primary sm:text-2xl">
              {t("signup.title")}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {t("signup.subtitle")}
            </p>
          </div>

          {/* Value props */}
          <div className="mb-6 space-y-2.5">
            {VALUE_PROPS.map(({ icon: Icon, key }) => (
              <div key={key} className="flex items-center gap-3 rounded-xl bg-black/[0.03] px-3.5 py-2.5">
                <Icon className="h-4 w-4 shrink-0 text-accent-pink" />
                <span className="text-xs text-text-secondary">{t(key)}</span>
              </div>
            ))}
          </div>

          {/* Form or confirmation */}
          {sent ? (
            <div className="rounded-2xl border border-black/[0.06] bg-black/[0.02] p-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent-pink/10">
                <span className="text-2xl">✉️</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-base font-semibold text-text-primary">
                {t("signup.checkEmail")}
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
                {t("signup.checkEmailDesc").replace("{email}", email)}
              </p>
              {error && (
                <p className="mt-2 text-xs text-red-500">{error}</p>
              )}
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleResend}
                  disabled={sending}
                  className="rounded-lg border border-black/[0.08] px-4 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-black/[0.04] disabled:opacity-50"
                >
                  {sending ? t("signup.sending") : t("signup.resend")}
                </button>
                <button
                  onClick={resetForm}
                  className="rounded-lg border border-black/[0.08] px-4 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-black/[0.04]"
                >
                  {t("signup.tryAnother")}
                </button>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleMagicLink} className="space-y-3">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t("signup.firstName")}
                    required
                    className="w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-pink focus:outline-none"
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={t("signup.lastName")}
                    required
                    className="w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-pink focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("signup.email")}
                  required
                  className="w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-pink focus:outline-none"
                />

                {error && (
                  <p className="text-xs text-red-500">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-glass-deep to-accent-pink py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-60"
                >
                  <Sparkles className="h-4 w-4" />
                  {sending ? t("signup.sending") : t("signup.sendMagicLink")}
                </button>
              </form>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-black/[0.08]" />
                <span className="text-xs text-text-tertiary">{t("signup.or")}</span>
                <div className="h-px flex-1 bg-black/[0.08]" />
              </div>

              {/* Google OAuth */}
              <button
                onClick={handleGoogle}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-black/[0.08] bg-white py-3 text-sm font-medium text-text-primary shadow-sm transition-all hover:bg-black/[0.02] hover:shadow-md"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {t("signup.continueWithGoogle")}
              </button>
            </>
          )}

          {/* Already a member */}
          <p className="mt-6 text-center text-xs text-text-tertiary">
            {t("signup.alreadyMember")}{" "}
            <button
              onClick={handleGoogle}
              className="font-semibold text-accent-pink transition-colors hover:text-glass-deep"
            >
              {t("signup.signIn")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
