# Pantheus — Layout

> Single-page landing (v1), bilingual at `/vi` (default) and `/en`. Copy is in `Content.md` → `messages/*`. Tokens in `Branding.md`. Section transitions and the alternatives below are open for the agent to explore.

## Section order
1. **Nav** — wordmark left; minimal links + language toggle right.
2. **Hero** — the thesis. Headline + subhead + CTA, over the lit-grid aura. **Signature lives here.**
3. **Problem** — the spreadsheet/guesswork pain anchor.
4. **Pillars** — the five value props (parallel, **not numbered**).
5. **How we work** — 3-step sequence (**numbered 01/02/03**).
6. **Who it's for** — one short statement, lots of air.
7. **Closing CTA** — heading + subline + placeholder CTA, aura echo.
8. **Footer** — wordmark, tagline, minimal nav, language toggle, ©.

## Signature (v1)
Typographic hero + lit-grid aura + the lambda/triple-bar motif. Headline enters with a mask/stagger reveal. **Aspirational upgrade (explore):** an SVG exploded-e-bike line diagram that assembles on scroll (Motion) — pursue only if an accurate e-bike SVG asset is provided; otherwise keep the typographic signature. Do not fake it with stock art.

## Wireframes

**Nav** (transparent over hero → hairline border + paper bg on scroll)
```
┌─────────────────────────────────────────────┐
│  ◭ PANTHEUS              Approach   EN | VI   │
└─────────────────────────────────────────────┘
```

**Hero**
```
┌─────────────────────────────────────────────┐
│  · · · · · · · faint lit grid · · · · · · ·  │
│  · · · · soft monochrome sweep · · · · · · ·  │
│                                               │
│   Your factory doesn't fit a template.        │   ← display-1, Manrope
│   Your ERP shouldn't either.                  │
│                                               │
│   Custom ERP for Vietnamese manufacturing —   │   ← subhead, ink-soft
│   built around how you work. On your servers. │
│                                               │
│   [ Book a consultation ]                     │   ← ink button
│  · · · · · · grain + vignette · · · · · · · ·  │
└─────────────────────────────────────────────┘
```

**Pillars** (parallel — NO numbers; lambda/triple-bar marks; hairline-separated)
```
┌──────────────┬──────────────┬───────────────┐
│ Λ Built      │ Λ Runs on    │ Λ Outcomes,   │
│   around you │   your ground │   not modules │
│ Your process │ Data never   │ Every feature │
│ is the spec. │ leaves...    │ ties to a #.  │
├──────────────┼──────────────┼───────────────┤
│ Λ Built for  │ Λ Ask your   │               │
│   the floor  │   factory    │               │
└──────────────┴──────────────┴───────────────┘
   reveal: staggered fade + translate-up on scroll
```
*(3-col desktop → 2-col tablet → 1-col mobile. Or a stacked full-width hairline-row layout — agent's call.)*

**How we work** (real sequence — numbered; mono labels)
```
  01 ───────── 02 ───────── 03
  Understand   Build        Grow
  find the     ship the     extend as
  bottleneck   system       you scale
```

**Footer**
```
┌─────────────────────────────────────────────┐
│  ◭ PANTHEUS                                   │
│  The foundation your operations stand on.     │
│  Approach · Contact            EN | VI        │
│  © 2026 Pantheus                              │
└─────────────────────────────────────────────┘
```

## Responsive
- **Mobile-first.** Nav collapses to a shadcn **Sheet**; language toggle stays visible.
- Type scales via `clamp()` (see `Branding.md`).
- Pillars: 3-col → 1-col; generous vertical rhythm.
- **Aura lighter/disabled on mobile** for performance; sweep frozen under `prefers-reduced-motion`.
- Tap targets ≥ 44px; visible keyboard focus throughout.

## Explore (latitude)
Section transitions, the exploded-bike signature, alternative pillar layouts (stacked hairline rows vs grid), and the optional accent bloom from `Vibe.md` are all fair game — propose before committing major visual bets.