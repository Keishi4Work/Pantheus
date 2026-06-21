# Pantheus — Tech Stack

> Marketing landing page only. Pantheus *products* deploy on-premise; this site is public marketing and ships to Vercel. v1 = first-impression layer, built to extend cleanly.

## Stack (2026 default, verified current)
| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16** (App Router, React 19, TypeScript) | Server Components by default; static-render the marketing pages |
| Styling | **Tailwind CSS v4** | OKLCH color system, `@import "tailwindcss"`, `@theme inline`; CSS-variable tokens from `Branding.md`, structured for dark mode later |
| UI primitives | **shadcn/ui** (`new-york` style) | copy-paste components, not a dependency. **Scaffolding, not the look** — the design is custom. Use sparingly: Button, Sheet (mobile nav), Tooltip. OKLCH base colors |
| Animation | **Motion** (formerly Framer Motion, v12) | scroll reveals, stagger, hover; hardware-accelerated scroll + OKLCH color animation pairs with Tailwind v4 |
| Smooth scroll | **Lenis** | the Base.vn-grade smoothness; wrap the page, sync with Motion scroll |
| i18n | **next-intl** | EN/VI; `[locale]` routing; ~2KB, native Server Component support, Next.js 16 compatible |
| Fonts | **`next/font`** | self-host Manrope + Geist Mono; `display: swap`; subset `latin` + `latin-ext` (Vietnamese) |
| Hosting | **Vercel** | static where possible; products stay on-prem (this is marketing only) |

## Aura — no WebGL
Per the motion choice, the lit-grid aura is **CSS / Canvas only** (no Three.js / R3F):
- Grid: CSS `background-image` (repeating linear-gradients) or an SVG pattern in `--grid`.
- Light sweep: an animated radial-gradient "light" mask drifting across, driven by Motion or CSS keyframes (greyscale, no blue).
- Grain: tiled SVG `feTurbulence` noise or a small PNG at low opacity.
- Vignette: a radial-gradient overlay in warm grey.
- Gate behind `prefers-reduced-motion`; lighten/disable on mobile.

## i18n setup (next-intl, App Router)
- `src/i18n/routing.ts` — `defineRouting({ locales: ['en','vi'], defaultLocale: 'vi', localePrefix: 'as-needed' })` *(default-locale + prefix is a small call — flip to `en` / `always` if preferred)*.
- Routing middleware via `createMiddleware(routing)`. **Note:** Next.js 16 introduced the `proxy.ts` convention; next-intl still uses `middleware.ts` — follow next-intl's current docs at build time.
- All pages/layouts under `app/[locale]/`. Wrap root in `NextIntlClientProvider`.
- For static rendering: call `setRequestLocale(locale)` in each page/layout and export `generateStaticParams()` returning all locales.
- Copy lives in `messages/en.json` + `messages/vi.json`, sourced from `Content.md`. **Never hardcode strings.**
- `LanguageSwitcher` uses next-intl's navigation APIs (`useRouter`, `usePathname` from `@/i18n/routing`), not `next/navigation`.
- Add `hreflang` alternates for SEO.

## Setup (current commands)
```bash
npx create-next-app@latest pantheus --tailwind --typescript --app --src-dir
cd pantheus
npx shadcn@latest init            # new-york style, OKLCH base
npx shadcn@latest add button sheet tooltip
npm install motion lenis next-intl
# fonts via next/font (no install needed for Google fonts; geist via `npm i geist`)
```

## Folder structure
```
src/
  app/
    [locale]/
      layout.tsx        # NextIntlClientProvider, fonts, Lenis wrapper
      page.tsx          # the single landing page (sections)
  components/
    sections/           # Hero, Problem, Pillars, Process, Audience, CTA, Footer
    aura/               # LitGridAura, Grain, Vignette
    ui/                 # shadcn components (Button, Sheet, Tooltip)
    LanguageSwitcher.tsx
  i18n/
    routing.ts
    request.ts
  styles/
    globals.css         # @import tailwindcss; @theme inline; :root + .dark tokens
messages/
  en.json
  vi.json
middleware.ts           # next-intl routing
```

## SEO / metadata (fold-in, minimal v1)
- Per-locale `<title>` / description from messages; `hreflang` alternates; OG image (monochrome wordmark on paper); favicon from the logo SVG. Sitemap with both locales.

## CTA / forms
- **Placeholder for now** — CTA links to `#` or a `mailto:`. No backend/form service in v1. Wire a real action (form service or scheduling link) when the product/contact flow is ready.

## Quality floor
Static render the marketing pages; lazy-load the aura; respect `prefers-reduced-motion`; keyboard focus visible; check **bronze accent contrast** on paper (use `--accent-text` for small text to hit AA); responsive down to mobile.