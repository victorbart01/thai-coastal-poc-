# Phase 4 — Gamification & Rétention

## Implementation

- [x] 1. Migration SQL (`004_gamification.sql`) — badges + user_badges tables with RLS
- [x] 2. Types (`types.ts`) — Badge, UserBadge, UserStats, LeaderboardEntry
- [x] 3. i18n (`i18n.ts`) — ~25 EN + ~25 TH keys for profile, badges, leaderboard, rarity
- [x] 4. `badges.ts` — BADGE_DEFINITIONS + checkBadgeCriteria()
- [x] 5. `useUserBadges.ts` — hook for fetching/awarding badges
- [x] 6. `useUserProfile.ts` — hook for profile + spots + stats
- [x] 7. `BadgeCard.tsx` — badge display with rarity colors + locked state
- [x] 8. `ProfileHeader.tsx` — avatar, name, bio, stats row, share button
- [x] 9. `/profile/[id]/page.tsx` — full profile page with badges + collection
- [x] 10. `LeaderboardPanel.tsx` — top 10 contributors sidebar panel
- [x] 11. `Sidebar.tsx` + `MobileDrawer.tsx` — wired leaderboard panel
- [x] 12. `AuthButton.tsx` — "My Profile" link in dropdown
- [x] 13. `SpotPopup.tsx` — clickable author name → profile link
- [x] 14. `npm run build` — passes ✅

## Manual steps required
- [ ] Execute `supabase/migrations/004_gamification.sql` in Supabase SQL Editor

## Review
- Build passes with 0 errors, only 2 warnings (img vs Image in AuthButton/ProfileHeader — external URLs with referrerPolicy)
- Profile page at `/profile/[id]` — 3.85 kB client bundle
- All 8 new files created, 7 existing files modified
