-- ============================================================
-- 002_spots.sql — Community Spots ("Drops")
-- ============================================================

-- Spots table
create table public.spots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text default '',
  latitude double precision not null,
  longitude double precision not null,
  rating smallint not null check (rating between 1 and 5),
  tags text[] default '{}',
  status text not null default 'published' check (status in ('draft', 'published', 'hidden')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Spatial index on lat/lng (PostGIS not required — simple btree)
create index spots_lat_lng on public.spots (latitude, longitude);
create index spots_user_id on public.spots (user_id);
create index spots_status on public.spots (status);

-- Spot photos table
create table public.spot_photos (
  id uuid primary key default gen_random_uuid(),
  spot_id uuid not null references public.spots(id) on delete cascade,
  storage_path text not null,
  position smallint not null default 0,
  created_at timestamptz default now() not null
);

create index spot_photos_spot_id on public.spot_photos (spot_id);

-- Reuse set_updated_at() trigger from 001
create trigger set_updated_at
  before update on public.spots
  for each row execute function public.set_updated_at();

-- ─── RLS ────────────────────────────────────────────────────

alter table public.spots enable row level security;
alter table public.spot_photos enable row level security;

-- Spots: anyone can read published spots
create policy "Published spots are viewable by everyone"
  on public.spots for select
  using (status = 'published');

-- Spots: authenticated users can insert their own
create policy "Users can insert their own spots"
  on public.spots for insert
  with check (auth.uid() = user_id);

-- Spots: users can update their own
create policy "Users can update their own spots"
  on public.spots for update
  using (auth.uid() = user_id);

-- Spots: users can delete their own
create policy "Users can delete their own spots"
  on public.spots for delete
  using (auth.uid() = user_id);

-- Spot photos: anyone can read photos of published spots
create policy "Spot photos are viewable by everyone"
  on public.spot_photos for select
  using (
    exists (
      select 1 from public.spots
      where spots.id = spot_photos.spot_id
        and spots.status = 'published'
    )
  );

-- Spot photos: users can insert photos for their own spots
create policy "Users can insert photos for their own spots"
  on public.spot_photos for insert
  with check (
    exists (
      select 1 from public.spots
      where spots.id = spot_photos.spot_id
        and spots.user_id = auth.uid()
    )
  );

-- Spot photos: users can delete photos for their own spots
create policy "Users can delete photos for their own spots"
  on public.spot_photos for delete
  using (
    exists (
      select 1 from public.spots
      where spots.id = spot_photos.spot_id
        and spots.user_id = auth.uid()
    )
  );

-- ─── Storage ────────────────────────────────────────────────

-- Create bucket (run via Dashboard or supabase CLI)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'spot-photos',
  'spot-photos',
  true,
  5242880, -- 5MB
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

-- Storage: anyone can read
create policy "Public read access on spot-photos"
  on storage.objects for select
  using (bucket_id = 'spot-photos');

-- Storage: authenticated users can upload in their own folder
create policy "Users can upload to their own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'spot-photos'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Storage: users can delete from their own folder
create policy "Users can delete from their own folder"
  on storage.objects for delete
  using (
    bucket_id = 'spot-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
