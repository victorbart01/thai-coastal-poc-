-- ============================================================
-- 004 — Gamification: Badges & User Badges
-- ============================================================

-- Badge definitions
create table if not exists badges (
  id          text primary key,
  icon        text not null,
  rarity      text not null check (rarity in ('common', 'rare', 'epic', 'legendary')),
  criteria_type text not null,
  criteria_value int not null
);

-- Seed 6 badges
insert into badges (id, icon, rarity, criteria_type, criteria_value) values
  ('first_drop',    '📍', 'common',    'spots_count',         1),
  ('explorer',      '🧭', 'rare',      'spots_count',         5),
  ('photographer',  '📸', 'rare',      'photos_count',       20),
  ('local_expert',  '🏆', 'epic',      'spots_count',        10),
  ('rare_find',     '💎', 'legendary', 'max_likes_on_spot',  50),
  ('sea_glass_og',  '🌊', 'legendary', 'member_days',        30)
on conflict (id) do nothing;

-- User-earned badges
create table if not exists user_badges (
  id        uuid default gen_random_uuid() primary key,
  user_id   uuid not null references auth.users(id) on delete cascade,
  badge_id  text not null references badges(id) on delete cascade,
  earned_at timestamptz default now(),
  unique (user_id, badge_id)
);

create index if not exists idx_user_badges_user on user_badges (user_id);

-- ── RLS ─────────────────────────────────────────────────────
alter table badges enable row level security;
alter table user_badges enable row level security;

-- Badges: readable by everyone
create policy "badges_select" on badges for select using (true);

-- User badges: readable by everyone
create policy "user_badges_select" on user_badges for select using (true);

-- User badges: insert only own
create policy "user_badges_insert" on user_badges
  for insert with check (auth.uid() = user_id);
