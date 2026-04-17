# Mend

AI-powered therapist booking — click-through prototype (agency demo MVP).

Built as a portfolio piece for [professionalmvp.com](https://professionalmvp.com).
Presents as a fully functional product: polished landing, a match quiz, ranked therapist results, a therapist profile with live-looking availability, and a booking confirmation.
All data is seeded — no real backend, auth, or scheduling.

**Tagline:** *Therapy, without the search.*

## Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **shadcn/ui** primitives
- **Fraunces** (display serif) + **Inter** (body) + **JetBrains Mono** (metadata) via `next/font/google`
- **Playwright** for E2E smoke tests
- **Vercel** hosting (via `mend.professionalmvp.com` subdomain)

## Prerequisites

- Node 20+
- npm 10+
- Git

## Getting Started

```bash
git clone https://github.com/respawner8/mend.git
cd mend
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Playwright smoke tests |
| `npm run test:ui` | Playwright UI mode |

## Project Structure (planned)

```
app/
  page.tsx                          Landing
  quiz/page.tsx                     Match quiz (client)
  matches/page.tsx                  Matches + browse list
  therapists/[id]/page.tsx          Therapist profile
  book/[id]/page.tsx                Booking + confirmation
  not-found.tsx                     Custom 404
components/
  site/                             Header, footer, logo
  sections/                         Landing sections
  quiz/                             Quiz steps + progress
  matches/                          Match card, filter chips, browse grid
  therapist/                        Profile header, availability calendar
  booking/                          Slot summary, confirm button, success state
  ui/                               shadcn primitives
lib/
  therapists.ts                     Seeded therapist directory
  quiz.ts                           Quiz questions + answer → match scoring
  specialties.ts                    Specialty + insurance enums
  utils.ts                          cn()
public/
  avatars/                          Tinted placeholder "photos" (no real faces)
tests/                              Playwright smoke tests
docs/superpowers/
  specs/                            Design spec
  plans/                            Implementation plan
```

## Deployment

Deferred to `mend.professionalmvp.com` subdomain once the project is built.

### Deploy to Vercel

1. Push to `main`.
2. Go to <https://vercel.com/new> → import `respawner8/mend`.
3. Keep defaults — Next.js is auto-detected. No env vars required.
4. In Project → Domains → add `mend.professionalmvp.com`.
5. The wildcard CNAME on `professionalmvp.com` handles DNS automatically.

## Design

Full design spec: [`docs/superpowers/specs/2026-04-18-mend-design.md`](docs/superpowers/specs/2026-04-18-mend-design.md).

## License

UNLICENSED — private repository.
