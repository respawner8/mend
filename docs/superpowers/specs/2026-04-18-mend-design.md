# Mend — Design Spec

**Date:** 2026-04-18
**Status:** Draft (awaiting review)
**Owner:** Nikhil Anand (respawner8)

## Overview

**Mend** is a click-through prototype of an AI-powered therapist booking product, built as a portfolio demo for **professionalmvp.com**. Non-technical founders in healthcare get a fully functional-looking patient-facing experience: quiz → ranked matches → therapist profile → booking → confirmation.

All data is seeded; no real backend, auth, scheduling, insurance verification, or payments.

## Goals

- Portfolio-grade UI quality — indistinguishable from a shipped product in screenshots and video walkthroughs.
- Fully mobile-responsive (this flow will often be completed on a phone).
- Fast to build; no backend or APIs.
- Maximum visual contrast with Crux (dark tech SaaS) and professionalmvp.com (crisp Swiss-Scandi white) — Mend proves the agency can ship a warm consumer-healthcare brand.

## Non-Goals

- Real therapist data, real matching ML, real insurance verification.
- Authentication, user accounts, persistent state.
- Video sessions / telehealth integrations.
- Payments (Stripe, HSA/FSA) — the "confirm" button is decorative.
- Therapist-side app (provider dashboard, intake notes). Patient-side only.
- HIPAA compliance — this is a demo with no PHI.

## Target User (Demo Persona)

Adults in the US seeking a licensed mental-health provider, unfamiliar with navigating directories or insurance. They're anxious, short on patience, and will bounce if the site feels clinical, sterile, or confusing. Sample copy addresses them directly and calmly.

## Brand & Positioning

- **Name:** Mend (`mend.professionalmvp.com` in production).
- **Tagline:** *Therapy, without the search.*
- **Sub-headline:** *Matched therapists in your state. Book in two minutes. Covered by most insurance.*
- **Tone:** calm, plainspoken, humane. No jargon ("modality", "intake"). No stock-therapy clichés (couches, mandalas).

## Screens (5)

### 1. Landing — `/`

Marketing page. Sections:

1. Hero — tagline with italic serif accent on "the search", primary CTA "Find a therapist", secondary "How it works".
2. Three-step explainer — *Answer 4 questions · See 3 matches · Book in 2 minutes*.
3. Who Mend helps — four chip categories: Anxiety, Depression, Life transitions, Relationships.
4. Featured therapist strip — three matched-tinted "preview" cards (no click-through from landing; teases the matches screen).
5. "How we match" — short explainer on how the quiz ranks therapists.
6. Testimonial / social-proof row — three pull-quotes.
7. FAQ accordion — 6 Q&As.
8. Final CTA band — "Take the 2-minute quiz".
9. Footer.

### 2. Match Quiz — `/quiz`

Four-question quiz; one question per step with a progress bar.

1. **What brings you in?** (multi-select chips) — Anxiety · Depression · Relationships · Life transitions · Trauma · Stress · Other
2. **How do you prefer to meet?** (radio) — Virtual · In-person · Either
3. **Any preference for your therapist?** (radio) — Any · Woman · Man · Non-binary
4. **Insurance?** (select / "self-pay") — Aetna · BCBS · Cigna · Kaiser · United · Self-pay · Other

Client-side only; answers stored in URL query params between steps (or `useState` within a single page — see Tech Stack). "Back" navigates to the previous question; "See my matches" on the last step navigates to `/matches?...`.

### 3. Matches + Browse — `/matches`

Ranked therapist list. Top of page: three "Top matches for you" cards with a visible match percentage. Below: "More therapists you might like" — remaining therapists in a simpler grid.

Each card: tinted avatar (no real photo), name, credentials (e.g., "LMFT · 8 yrs"), 2-3 specialty pills, next-available slot, insurance accepted, price (if self-pay), "See profile →" CTA.

Top of page also shows active quiz filters as editable chips (click to change).

### 4. Therapist Profile — `/therapists/[id]`

Two-column on desktop, stacked on mobile:

- **Left (60%):** tinted avatar + name + credentials, match score, short bio (3–4 paragraphs), "My approach" paragraph, specialty pills, insurance accepted, price.
- **Right (40%):** availability calendar — next 7 days, each day has 0–5 available time slots as clickable chips. Selected slot highlights. "Book with [First Name] →" button anchored below the calendar; disabled until a slot is picked.

### 5. Booking + Confirmation — `/book/[id]`

- Top: summary card showing therapist name, avatar, selected slot, length, price.
- Form (single screen, no steps):
  - Full name, email, phone.
  - Insurance selection (pre-filled from quiz, editable).
  - "Anything your therapist should know in advance?" textarea (optional).
  - Consent checkbox ("I understand Mend is a booking tool and does not provide emergency services.").
- Primary CTA: "Confirm booking". Clicking flips the card to a success state in place:
  - "You're booked with [Therapist]." ✓
  - Appointment details.
  - Next steps (what to expect before your first session — 2-3 bullet points).
  - "Back to home" link.

No email is actually sent; this is seeded. Form state lives in React component state and resets on reload.

### 6. Not-Found — `/not-found`

Same warm aesthetic, single message + "Take me home" button. Invalid therapist IDs land here.

## Navigation

- Sticky top header across all screens: logo (links `/`), minimal nav (How it works anchor on landing, "Find a therapist" CTA on other screens).
- Footer on landing + 404 only; app screens keep footer minimal or omit.

## Visual Direction

Direction **C — Sage & Warm** (chosen during brainstorming).

- **Background:** stone-cream `#f3f4ef`.
- **Surface:** white `#ffffff`.
- **Surface-2:** warm off-white `#f8f7f2`.
- **Borders:** warm gray `#d6d3cc`.
- **Text:** `#1f2937` primary, `#4b5563` secondary, `#9ca3af` tertiary.
- **Primary accent (sage):** `#5b8767`, deep `#3f6b4c` for hover states.
- **Warm accent (serif-italic callouts):** sage rendered in italic Fraunces serif; no second color.
- **Shapes:** gentle organic blobs as decorative elements on landing hero only; avoided on app screens to keep them readable.

**Typography:**
- **Display / serif italic accents:** **Fraunces** (Google Fonts) — for `h1`/`h2` with italic highlights ("the *search*").
- **Body:** **Inter** — 400/500 weights.
- **Mono (metadata rows, timestamps):** **JetBrains Mono** — 400.

**Motion:** none on first pass. Accordion expand/collapse uses base-ui defaults. No scroll-driven animation.

## Responsive Behavior

| Breakpoint | Behavior |
| --- | --- |
| `< 640px` (mobile) | Single column; hero display ~36px; therapist cards full-width; calendar collapses day-picker-first with time slots below. |
| `640–1024px` (tablet) | Two-col landing sections; match grid 2-up; profile stays stacked. |
| `> 1024px` (desktop) | Full layouts; profile two-column (bio left, calendar right); match grid 3-up. |

## Tech Stack

- **Next.js 16** (App Router; RSC where the screen has no interactivity; client components for quiz, slot picker, accordion).
- **TypeScript** strict.
- **Tailwind CSS v4**.
- **shadcn/ui** primitives: Button, Card, Badge, Input, Label, Textarea, RadioGroup (or controlled chips), Checkbox, Accordion, Separator, Progress (quiz bar).
- **lucide-react** for icons.
- **Fraunces** + **Inter** + **JetBrains Mono** via `next/font/google`.
- **Playwright** for E2E smoke tests (chromium + mobile-safari).
- **npm**.

## Data

All data lives in typed `lib/*.ts` files:

- **`lib/therapists.ts`** — 8 seeded therapists. Each: id, first/last name, pronouns, credentials, color (for tinted avatar), years of practice, specialties (tags), session modes (virtual/in-person), gender identity (for filter), insurances accepted, price (self-pay, nullable), short bio (3–4 sentences), approach paragraph, availability (next 7 days × 0–5 time slots).
- **`lib/quiz.ts`** — 4 questions with labeled options + a `scoreTherapist(answers, therapist) → {percent: 0-100, reasons: string[]}` function. Reasons-explainable scoring so the UI can surface "Why you matched" text if wanted later.
- **`lib/specialties.ts`** — specialty + insurance enums and display labels.
- **`lib/utils.ts`** — `cn()` helper.

## State

Quiz answers persist via URL search params on `/matches` and `/therapists/[id]` (so matches survive a reload and can be linked). Booking form state is in-memory React state (resets on reload — acceptable for a demo).

## Error Handling

- Invalid therapist IDs render the custom `not-found` page.
- Booking form validation: minimal (required fields + email format) via controlled inputs + simple inline messages; no external validation library needed.
- No network calls — nothing to time out.

## Testing Strategy

- **TypeScript:** `npm run typecheck`.
- **Lint:** `npm run lint`.
- **Playwright smoke tests** (chromium + mobile-safari):
  1. Landing renders hero, CTA navigates to `/quiz`.
  2. Quiz: progress bar updates; completing all 4 steps navigates to `/matches` with query params.
  3. Matches: top 3 cards have a match-percentage badge; clicking a card navigates to `/therapists/:id`.
  4. Therapist profile: slot selection enables "Book with" button; clicking navigates to `/book/:id?slot=...`.
  5. Booking: required-field validation; confirm click flips to success state in place.
  6. Invalid therapist id returns the custom 404.

## Deployment

Deferred — ready for Vercel when needed.

- Push to `main` on `respawner8/mend`.
- Vercel import → auto-detects Next.js.
- In Project → Domains → add `mend.professionalmvp.com`.
- The wildcard CNAME on `professionalmvp.com` handles DNS. SSL auto-provisions.
- Update the `cover` image path and set `status: "live"` in `professionalmvp/lib/demos.ts` once deployed.

## Repository

- **GitHub:** [`respawner8/mend`](https://github.com/respawner8/mend) (private).
- **Local:** `~/Desktop/Dev/mend`.

## Open Questions

- **Avatars:** plan uses tinted monogram circles (no real photos). If real stock photos are ever required, swap in `next/image` with Unsplash placeholders.
- **Emergency copy:** the booking consent checkbox notes "Mend does not provide emergency services." This is the right tone for a demo; a real product would also need a "In crisis? Call/text 988" banner on all app screens. Out of scope for v1.
- **"MVPs shipped" counter on professionalmvp.com:** bump from 3 to 4 when Mend goes live.

## Future Extensions (Out of Scope for v1)

- Real matching (embeddings, ML) instead of rule-based scoring.
- Calendar integration (Google Calendar, iCal feed).
- Video session room.
- Therapist-side dashboard + intake notes.
- Payments, insurance verification, ERA.
- Reviews / ratings.
- Messaging between sessions.
- Emergency-resource banner.
