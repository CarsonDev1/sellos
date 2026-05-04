# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint with next/core-web-vitals + next/typescript
```

No test framework is configured.

## Architecture

**SellOS** is a Next.js 14 (App Router) full-stack SaaS for AI-powered website generation, targeting Vietnamese-speaking entrepreneurs.

**Stack:** React 18, TypeScript, Tailwind CSS 3, shadcn/ui (v4 CLI but Radix-based components), Clerk auth, Supabase (PostgreSQL + RLS), Groq LLM API (llama-3.3-70b-versatile), Framer Motion.

### Route Layout

- `app/page.tsx` — Public landing page
- `app/(auth)/` — Clerk sign-in/sign-up (route group)
- `app/(dashboard)/dashboard/` — Protected dashboard behind Clerk middleware
  - `thong-tin/` — User profile & products (server actions in `actions.ts`)
  - `chon-template/` — Template picker
  - `du-an/` & `du-an/[id]/` — Project list & detail
  - `tao-web/` — Website generation trigger
  - `ai-chat/` — Groq-powered AI chat advisor
  - `admin/` — Admin panel
- `app/templates/` — Public template showcase pages (coaching, khoa-hoc, shop-online, thuc-pham)
- `app/w/[projectId]/` — Public hosted website preview (renders generated content)
- `app/api/` — Route handlers (chat, conversations, projects, generate-website, generate-description, public endpoints)

### Key Directories

- `components/ui/` — shadcn/ui primitives (Button, Card, Sheet, Accordion, etc.)
- `components/templates/{type}/` — Template-specific UI components per business type
- `components/generated/{type}/` — AI-generated content renderers (CoachingRenderer, ShopOnlineRenderer, ThucPhamRenderer)
- `components/ai-chat/` — Chat interface components
- `lib/supabase/` — Supabase clients (browser, server, admin) + typed query helpers (profile.ts, projects.ts, chat.ts)
- `lib/templates/` — Template registry (`index.ts`) + per-template schema/prompt/types
- `supabase/` — Database migration SQL files

### Auth & Data Flow

Clerk handles identity; Supabase handles data with RLS. Profile sync happens on login via `syncProfile()` in `lib/supabase/profile.ts`. The admin client (`createAdminClient()`) uses the service role key to bypass RLS when needed.

Middleware (`middleware.ts`) protects all `/dashboard(.*)` routes.

### Template System

Each business type (coaching, shop-online, khoa-hoc, thuc-pham) has:
- A schema definition and AI prompt in `lib/templates/{type}.ts`
- A TypeScript content interface (e.g., `CoachingContent`)
- A renderer component in `components/generated/{type}/`
- Showcase pages in `app/templates/{type}/`

The template registry in `lib/templates/index.ts` exports `TEMPLATES` array and `getTemplate()` helper.

### AI Chat

Streams responses via SSE from `/api/chat` using Groq. System prompt is personalized with the user's business data. Conversations persist in Supabase.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
GROQ_API_KEY
```

## Conventions

- Path alias: `@/*` maps to project root
- Vietnamese route names for business features (tao-web, du-an, thong-tin, chon-template)
- Server Components by default; `"use client"` only where needed
- `cn()` utility from `lib/utils.ts` for Tailwind class merging (clsx + tailwind-merge)
- shadcn/ui components added via `npx shadcn@latest add <component>`
- Supabase types in `lib/supabase/types.ts` — regenerate with Supabase CLI when schema changes

## Database

PostgreSQL via Supabase with RLS. Key tables: `profiles` (synced from Clerk), `business_info`, `products`, `projects` (status: draft/active/paused), `conversations`, `messages`. Enums: `business_type` (khoa-hoc, shop-online, dich-vu, coaching, khac), `user_role` (admin, user). Admin auto-assigned to `buitritinht@gmail.com`. All tables have auto `updated_at` triggers. RLS policies must always qualify column references (e.g., `p.id` not `id`) to avoid ambiguity.
