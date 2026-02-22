-- ============================================================
-- 003_social.sql — Comments, Likes, Saves
-- ============================================================

-- ─── Comments ─────────────────────────────────────────────────

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  spot_id uuid not null references public.spots(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 500),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index comments_spot_id on public.comments (spot_id);
create index comments_user_id on public.comments (user_id);
create index comments_parent_id on public.comments (parent_id);

-- Reuse set_updated_at() trigger from 001
create trigger set_updated_at
  before update on public.comments
  for each row execute function public.set_updated_at();

-- Enforce max 1 level of nesting: a reply cannot have a parent that is itself a reply
create or replace function public.enforce_comment_depth()
returns trigger as $$
begin
  if new.parent_id is not null then
    if exists (
      select 1 from public.comments
      where id = new.parent_id and parent_id is not null
    ) then
      raise exception 'Replies cannot be nested more than 1 level deep';
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger enforce_comment_depth
  before insert on public.comments
  for each row execute function public.enforce_comment_depth();

-- ─── Likes ────────────────────────────────────────────────────

create table public.likes (
  id uuid primary key default gen_random_uuid(),
  spot_id uuid not null references public.spots(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now() not null,
  unique (spot_id, user_id)
);

create index likes_spot_id on public.likes (spot_id);
create index likes_user_id on public.likes (user_id);

-- ─── Saves ────────────────────────────────────────────────────

create table public.saves (
  id uuid primary key default gen_random_uuid(),
  spot_id uuid not null references public.spots(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now() not null,
  unique (spot_id, user_id)
);

create index saves_spot_id on public.saves (spot_id);
create index saves_user_id on public.saves (user_id);

-- ─── RLS ──────────────────────────────────────────────────────

alter table public.comments enable row level security;
alter table public.likes enable row level security;
alter table public.saves enable row level security;

-- Comments: readable by everyone (on published spots)
create policy "Comments are viewable by everyone"
  on public.comments for select
  using (
    exists (
      select 1 from public.spots
      where spots.id = comments.spot_id
        and spots.status = 'published'
    )
  );

-- Comments: authenticated users can insert their own
create policy "Users can insert their own comments"
  on public.comments for insert
  with check (auth.uid() = user_id);

-- Comments: users can update their own
create policy "Users can update their own comments"
  on public.comments for update
  using (auth.uid() = user_id);

-- Comments: users can delete their own
create policy "Users can delete their own comments"
  on public.comments for delete
  using (auth.uid() = user_id);

-- Likes: readable by everyone
create policy "Likes are viewable by everyone"
  on public.likes for select
  using (
    exists (
      select 1 from public.spots
      where spots.id = likes.spot_id
        and spots.status = 'published'
    )
  );

-- Likes: authenticated users can insert their own
create policy "Users can insert their own likes"
  on public.likes for insert
  with check (auth.uid() = user_id);

-- Likes: users can delete their own
create policy "Users can delete their own likes"
  on public.likes for delete
  using (auth.uid() = user_id);

-- Saves: PRIVATE — only visible to owner
create policy "Users can view their own saves"
  on public.saves for select
  using (auth.uid() = user_id);

-- Saves: authenticated users can insert their own
create policy "Users can insert their own saves"
  on public.saves for insert
  with check (auth.uid() = user_id);

-- Saves: users can delete their own
create policy "Users can delete their own saves"
  on public.saves for delete
  using (auth.uid() = user_id);
