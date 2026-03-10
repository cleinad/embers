# Embers UBC — Next.js Web App

The official website for **Embers UBC**, built with Next.js 16, Tailwind CSS, and Supabase.

---

## Project Structure

```
embers-web/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home
│   ├── about/page.tsx    # About
│   ├── calendar/page.tsx # Events calendar
│   └── admin/page.tsx    # Admin dashboard (exec login required)
├── components/
│   ├── Navbar.tsx
│   ├── CalendarView.tsx
│   └── EventForm.tsx
├── lib/
│   ├── supabaseClient.ts # Public client (anon key — safe in browser)
│   └── supabaseAdmin.ts  # Server-only admin client (service role key)
├── public/images/        # Static assets
├── .env.local            # Local environment variables (not committed)
├── supabase-schema.sql   # Database schema reference
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js >= 20.9.0 (use `.nvmrc`: `nvm use`)
- A [Supabase](https://supabase.com) project

### Install & Run

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env.local` file at the project root:

```env
# Public — safe to expose in the browser
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Secret — server-only, NEVER expose in client code
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these values in your Supabase project under **Settings → API**.

> ⚠️ The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security. Only use it in Server Actions, Route Handlers, or server components via `lib/supabaseAdmin.ts`.

### Vercel Deployment

Add all three variables in **Vercel → Project Settings → Environment Variables**:

| Variable | Where to find |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon / public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role |

---

## Database

The schema is in `supabase-schema.sql`. Apply it in Supabase → SQL Editor.

Key tables:
- `events` — public event listings
- `exec_users` — authorized admin email allowlist

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
