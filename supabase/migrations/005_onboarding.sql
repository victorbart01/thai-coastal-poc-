-- Add onboarding tracking column
alter table public.user_profiles
  add column onboarding_completed_at timestamptz;
