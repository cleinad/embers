# Embers UBC — Next.js Full-Stack App

A modern full-stack web application for the Embers UBC Christian Business Community, built with Next.js 14 (App Router), Supabase, and Tailwind CSS.

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, Tailwind CSS
- **Calendar**: FullCalendar React
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Deployment**: Vercel

---

## Project Structure

```
/app
  layout.tsx          ← Root layout with Navbar
  page.tsx            ← Homepage (hero, mission, story, activities)
  calendar/page.tsx   ← Public event calendar
  about/page.tsx      ← About page
  admin/page.tsx      ← Exec-only admin dashboard

/components
  Navbar.tsx          ← Responsive navbar
  CalendarView.tsx    ← FullCalendar + Supabase integration
  EventForm.tsx       ← Create/edit event form

/lib
  supabaseClient.ts   ← Supabase client
```

---

## Getting Started

### 1. Clone & Install

```bash
cd embers-next
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Go to **Authentication > Users** and create exec member accounts
4. Go to **SQL Editor** and add exec emails to the `exec_users` table:
   ```sql
   insert into exec_users (email) values ('exec@yourdomain.com');
   ```

### 3. Configure Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials from **Settings > API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Pages

| Route       | Description                                      |
|-------------|--------------------------------------------------|
| `/`         | Homepage — hero, purpose/mission, story, events  |
| `/calendar` | Public dynamic calendar with event details       |
| `/about`    | About page with story, purpose, activities       |
| `/admin`    | Exec-only dashboard — login, CRUD for events     |

---

## Admin Access

1. Navigate to `/admin`
2. Sign in with your Supabase auth email/password
3. The app checks if your email exists in the `exec_users` table
4. If authorized → full CRUD access to events

---

## Database Schema

See `supabase-schema.sql` for the full schema including:

- `events` table with RLS policies
- `exec_users` table for authorization
- Public read, authenticated write policies

---

## Deploy to Vercel

1. Push the `embers-next` directory to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

```bash
npm run build   # verify build passes before deploying
```
