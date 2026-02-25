-- ============================================================
-- 006 — Expanded badges: 18 new badges (6 → 24 total)
-- ============================================================

insert into badges (id, icon, rarity, criteria_type, criteria_value) values
  -- Common
  ('first_snap',       '📷', 'common',    'photos_count',         1),
  ('warm_welcome',     '👋', 'common',    'total_likes_received', 1),
  ('good_eye',         '👁️', 'common',    'likes_given',          5),
  ('collector',        '🔖', 'common',    'saves_count',          3),
  ('first_words',      '💬', 'common',    'comments_count',       1),
  ('new_member',       '🌱', 'common',    'member_days',          7),
  ('tagger',           '🏷️', 'common',    'unique_tags_used',     3),
  -- Rare
  ('crowd_pleaser',    '❤️', 'rare',      'total_likes_received', 25),
  ('curator',          '🗂️', 'rare',      'saves_count',          15),
  ('social_butterfly', '🦋', 'rare',      'comments_count',       10),
  ('supporter',        '🤝', 'rare',      'likes_given',          25),
  -- Epic
  ('paparazzi',        '🎞️', 'epic',      'photos_count',         50),
  ('influencer',       '⭐', 'epic',      'total_likes_received', 100),
  ('storyteller',      '📖', 'epic',      'comments_count',       50),
  ('seasoned',         '🍂', 'epic',      'member_days',          90),
  -- Legendary
  ('cartographer',     '🗺️', 'legendary', 'spots_count',          30),
  ('hall_of_fame',     '👑', 'legendary', 'total_likes_received', 500),
  ('veteran',          '🔱', 'legendary', 'member_days',          365)
on conflict (id) do nothing;
