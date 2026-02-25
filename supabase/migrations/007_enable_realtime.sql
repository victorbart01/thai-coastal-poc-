-- Enable Supabase Realtime for social notifications
alter publication supabase_realtime add table public.likes;
alter publication supabase_realtime add table public.comments;
