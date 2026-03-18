-- ============================================================
-- Embers UBC — Supabase Database Schema
-- ============================================================

-- SERIES TABLE
create table if not exists series (
  id     uuid primary key default gen_random_uuid(),
  title  text not null,
  color  text not null default 'orange'
);

-- EVENTS TABLE
create table if not exists events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date        date not null,
  start_time  text,
  end_time    text,
  host_name   text,
  room        text,
  description text,
  series_id   uuid references series(id) on delete set null,
  created_at  timestamp with time zone default now()
);

-- EXEC USERS TABLE (for authorization)
create table if not exists exec_users (
  id    uuid primary key default gen_random_uuid(),
  email text not null unique
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

-- ── Series ──

alter table series enable row level security;

create policy "Public can read series"
  on series for select
  using (true);

create policy "Exec can insert series"
  on series for insert
  to authenticated
  with check (
    exists (
      select 1 from exec_users
      where email = auth.email()
    )
  );

create policy "Exec can update series"
  on series for update
  to authenticated
  using (
    exists (
      select 1 from exec_users
      where email = auth.email()
    )
  );

create policy "Exec can delete series"
  on series for delete
  to authenticated
  using (
    exists (
      select 1 from exec_users
      where email = auth.email()
    )
  );

-- ── Events ──

alter table events enable row level security;

-- Public read: anyone can view events (for the calendar page)
create policy "Public can read events"
  on events for select
  using (true);

-- Authenticated insert: logged-in exec users can create events
create policy "Exec can insert events"
  on events for insert
  to authenticated
  with check (
    exists (
      select 1 from exec_users
      where email = auth.email()
    )
  );

-- Authenticated update: exec users can update events
create policy "Exec can update events"
  on events for update
  to authenticated
  using (
    exists (
      select 1 from exec_users
      where email = auth.email()
    )
  );

-- Authenticated delete: exec users can delete events
create policy "Exec can delete events"
  on events for delete
  to authenticated
  using (
    exists (
      select 1 from exec_users
      where email = auth.email()
    )
  );

-- ── Exec Users ──

alter table exec_users enable row level security;

-- Authenticated read: logged-in users can check exec_users
create policy "Authenticated can read exec_users"
  on exec_users for select
  to authenticated
  using (true);

-- ============================================================
-- Migration: add series_id to existing events table
-- (Run this if the events table already exists without series_id)
-- ============================================================
-- alter table events
--   add column if not exists series_id uuid references series(id) on delete set null;

-- ============================================================
-- Seed: Add your first exec member email
-- Replace with actual exec member emails
-- ============================================================
-- insert into exec_users (email) values ('exec@example.com');
