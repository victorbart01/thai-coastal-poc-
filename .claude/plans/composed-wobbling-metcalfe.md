# Plan: Dedicated Sign-up Page with Onboarding

## Context
The current sign-up flow is broken: the sidebar "Sign up" link goes to `/about`, and the only way to authenticate is clicking "Sign in" in the header which immediately redirects to Google OAuth — taking users off-site with no context. We need a dedicated, welcoming sign-up page that sells the value of joining before asking users to authenticate.

**Auth method chosen: Magic link (passwordless) + Google OAuth**

## Page Design — `/signup`

Centered glassmorphism card on `bg-ocean-950` background, mobile-responsive.

**Structure:**
```
┌──────────────────────────────────────────┐
│  ← Back to map                           │
├──────────────────────────────────────────┤
│                                          │
│   🐚  (sea glass emoji or icon)         │
│                                          │
│   Join the Sea Glass Community           │
│   "Share your spots, save your           │
│    favorites, and connect with           │
│    collectors worldwide."                │
│                                          │
│   ┌─ Value props (icon + text) ────────┐ │
│   │ 📍 Share your best spots           │ │
│   │ 💾 Save & bookmark favorites       │ │
│   │ 💬 Comment & exchange with others  │ │
│   │ 🏆 Earn badges & climb the board   │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ┌─ Form card ────────────────────────┐ │
│   │ [First name]  [Last name]          │ │
│   │ [Email address          ]          │ │
│   │ [ ✨ Send me a magic link ]        │ │
│   │                                    │ │
│   │ ──── or ────                       │ │
│   │                                    │ │
│   │ [ G  Continue with Google ]        │ │
│   └────────────────────────────────────┘ │
│                                          │
│   Already a member? Sign in              │
│                                          │
└──────────────────────────────────────────┘
```

**After magic link sent → swap form for confirmation:**
```
│   ┌─ Confirmation ─────────────────────┐ │
│   │  ✉️  Check your email!             │ │
│   │  We sent a magic link to           │ │
│   │  [email]. Click it to join.        │ │
│   │                                    │ │
│   │  [ Resend link ]  [ Try another ]  │ │
│   └────────────────────────────────────┘ │
```

## Changes

### 1. New: `src/app/signup/page.tsx`
- "use client" page with form state management
- Value props section with 4 icons (MapPin, Bookmark, MessageCircle, Trophy from lucide)
- Form: firstName + lastName (row) + email + submit button
- Google OAuth button (reuses same `supabase.auth.signInWithOAuth` pattern from AuthButton)
- Magic link: `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo, data: { full_name } } })`
  - `full_name: "${firstName} ${lastName}"` — matches the existing `handle_new_user` DB trigger
- Post-submit: show "check your email" confirmation with resend option
- "Already a member? Sign in" link triggers Google OAuth directly
- Responsive: single column on mobile, comfortable max-width on desktop
- Uses existing design tokens: `glass-card`, `bg-ocean-950`, accent-pink, Space Grotesk headings

### 2. Edit: `src/components/Sidebar/QuickLinks.tsx`
- Change `{ label: t("nav.signUp"), href: "/about" }` → `href: "/signup"`

### 3. Edit: `src/components/AuthButton.tsx`
- When not authenticated: change from inline Google OAuth trigger to `<Link href="/signup">`
- This sends new users to the onboarding page instead of raw OAuth redirect
- Returning users who already have an account can use "Already a member? Sign in" on the signup page or the Google button there

### 4. Edit: `src/components/BottomTabBar.tsx`
- When unauthenticated user taps "Contribute" or "Profile": redirect to `/signup` via `router.push("/signup")` instead of silently doing nothing

### 5. Edit: `src/components/SpotDetailPanel.tsx`
- Change the "Sign in to comment/like/save" static text into clickable `<Link href="/signup">` elements so unauthenticated users have a clear path to sign up

### 6. Edit: `src/lib/i18n.ts`
Add keys (EN + TH):
- `signup.title`: "Join the Sea Glass Community" / Thai
- `signup.subtitle`: "Share your spots, save your favorites, and connect with collectors worldwide." / Thai
- `signup.valueShare`: "Share your best spots with the community" / Thai
- `signup.valueSave`: "Save & bookmark your favorites" / Thai
- `signup.valueComment`: "Comment & exchange with collectors" / Thai
- `signup.valueBadges`: "Earn badges & climb the leaderboard" / Thai
- `signup.firstName`: "First name" / Thai
- `signup.lastName`: "Last name" / Thai
- `signup.email`: "Email address" / Thai
- `signup.sendMagicLink`: "Send me a magic link" / Thai
- `signup.sending`: "Sending..." / Thai
- `signup.or`: "or" / Thai
- `signup.continueWithGoogle`: "Continue with Google" / Thai
- `signup.alreadyMember`: "Already a member?" / Thai
- `signup.signIn`: "Sign in" / Thai
- `signup.checkEmail`: "Check your email!" / Thai
- `signup.checkEmailDesc`: "We sent a magic link to {email}. Click it to join." / Thai
- `signup.resend`: "Resend link" / Thai
- `signup.tryAnother`: "Use another email" / Thai
- `signup.backToMap`: (reuse existing `profile.backToMap`)

## Prerequisites (Supabase Dashboard)
**Important:** Magic link requires email auth to be enabled in Supabase:
- Supabase Dashboard → Authentication → Providers → Email → Enable
- Ensure "Confirm email" is enabled
- The magic link callback goes through the existing `/auth/callback` route

## Files Summary
| File | Action |
|------|--------|
| `src/app/signup/page.tsx` | **Create** |
| `src/components/Sidebar/QuickLinks.tsx` | **Edit** — href `/about` → `/signup` |
| `src/components/AuthButton.tsx` | **Edit** — button → Link to `/signup` |
| `src/components/BottomTabBar.tsx` | **Edit** — redirect unauth taps to `/signup` |
| `src/components/SpotDetailPanel.tsx` | **Edit** — sign-in prompts → links to `/signup` |
| `src/lib/i18n.ts` | **Edit** — add ~20 translation keys |

## Verification
1. Click "Sign up" in sidebar → goes to `/signup` page (not `/about`)
2. Click "Sign in" in header → goes to `/signup` page
3. On signup page: fill form + submit → "Check your email" confirmation shown
4. On signup page: click "Continue with Google" → OAuth flow works, redirects back
5. Mobile: tap "Contribute" or "Profile" when logged out → redirected to `/signup`
6. Spot detail: "Sign in to comment" is now a clickable link to `/signup`
7. Responsive: page looks good on mobile and desktop
8. Both EN and TH translations work
