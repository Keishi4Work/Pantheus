# Build notes — what was tried (so later passes don't repeat dead ends)

## Gate 0 — Scaffold + foundation (done)
- **Stack live:** Next.js 16.2.9 (Turbopack), React 19.2.4, Tailwind v4, next-intl 4.13, Motion 12.40, Lenis 1.3, shadcn (radix-nova preset).
- **Next 16 middleware = `src/proxy.ts`** (NOT `middleware.ts`). Build confirms it: "ƒ Proxy (Middleware)". `createMiddleware(routing)` from `next-intl/middleware`.
- **Locale routing:** `defaultLocale: vi`, `localePrefix: as-needed`. `/` → VI, `/en` → EN, `/vi` 307-redirects to `/`. Verified via curl + `--dump-dom`.
- **Tokens:** brand vars in `:root`, shadcn semantic tokens remapped onto them, brand utilities via `@theme inline`. Accent = **oxblood** `#7A2E2E`. Dark mode block present but inert (do not build yet).
- **Fonts:** Manrope (display+body) + Geist Mono (utility) via `next/font/google`. **Manrope's `vietnamese` subset is valid and covers stacked tone marks** (`ự ặ ỡ ễ ộ` render correctly in all 3 roles). → No Be Vietnam Pro fallback needed.
- **shadcn:** `radix` base, `radix-nova` style. Components: button, sheet, tooltip. Tooltip uses `bg-foreground/text-background` → on-brand automatically after remap. `--radius: 0.25rem` (engineered, lightly squared).

### Dead ends / gotchas
- `create-next-app` refuses a non-empty dir → scaffolded into `/tmp` (`--disable-git --skip-install`) then copied in, excluding its own `AGENTS.md`/`CLAUDE.md`/`README.md` to preserve our brief.
- shadcn `init -b stone` fails: `-b` now means primitives base (`radix`|`base`), not color. Use `init -d -y -b radix`; base color is overridden in `globals.css` anyway. It prompts for a preset unless `-d`.
- **Port 3000 is taken by an unrelated `bun` app ("AdhdTodo").** Run Pantheus on **3100**: `PORT=3100 npm start`.
- **Headless screenshots unreliable here:** the user's running Chrome intercepts `--headless=new --screenshot` and returns a frozen/cached frame (identical bytes regardless of URL). `--dump-dom` is reliable; for true screenshots use Playwright with `channel: 'chrome'` and a hard `waitForLoadState`, or capture when the user's Chrome is closed. Do NOT `pkill chrome` (kills the user's session).

## Gate 1 — Nav + Hero (done)
- **Nav:** fixed, transparent over hero → hairline + `bg-paper/85 backdrop-blur` on scroll (`scrollY > 12`). Desktop: mono uppercase links + `LanguageSwitcher`. Mobile: shadcn `Sheet`, **triple-bar (≡) as the hamburger glyph**, switcher stays visible.
- **Hero:** on-LOAD reveal (`HeroText`) — each sentence rises out of an `overflow-hidden` mask (`py-[0.12em]` protects VN tone marks from clipping), staggered, then subhead + CTA fade up. Splits headline on sentence end so EN/VN both get cadence. Eyebrow = the logo tagline (mono, Λ prefix). Foundation ground-line = three stacked hairlines (the ≡) the hero sits on.
- **Aura:** `LitGridAura` = faint masked grid + slow drifting white sweep (`aura-drift` 22s) + grain (feTurbulence) + warm vignette. CSS only. Mobile lightens, reduced-motion freezes the sweep.
- **CTA:** reusable ink block, arrow nudges on hover. Placeholder `href="#"`.
- **Locale detection OFF** (`localeDetection: false` in routing.ts): `/` deterministically serves VI regardless of browser `Accept-Language` (matches the explicit "/ = VI" choice). next-intl defaults detection ON, which made Chrome (en-US) get English at `/`. Switcher / `/en` still reach English. → If Keishi prefers browser-based auto-detect, flip this one flag.

## Gates 2–6 — Problem, Pillars, Process, Audience, Closing, Footer (done)
- **Section rhythm:** alternating bands — Problem + Process on `bg-section` (grey), Hero/Pillars/Audience/Closing on paper. Hero + Closing carry the aura; mid-sections clean.
- **Problem:** heading left, opening quoted question lifted into a display pull-quote (regex split, source copy untouched), support text right.
- **Pillars:** locked hairline-row stack — `Λ` (oxblood) + mono label + display headline + body, 5 rows, `border-t` each + `border-b` on the group. Never numbered. Anchor `id="approach"`.
- **Process:** numbered `01/02/03` (mono) — the only numbered section. Continuous top rule across 3 columns. `id="process"`.
- **Audience:** mono `Λ` eyebrow (the heading) + one large display statement, lots of air.
- **Closing:** aura echo + triple-bar foundation bookend (mirrors hero) + heading + subline + CTA. `id="contact"`.
- **Footer:** wordmark + wordmark line + tagline, mono nav (Approach·Contact), LanguageSwitcher, ©.
- All section copy via `getTranslations` from `messages/*` — nothing hardcoded. Reveals via `Reveal` (whileInView, staggered by index).

## Revision pass 1 (post Gate 6) — user feedback
- **Brand mark:** `assets/pantheus-mark.svg` (filled lambda) → `Mark.tsx` (currentColor). Replaced the text "Λ" glyph + stroked `LambdaMark` (deleted) in hero/audience eyebrows and pillar markers. `assets/favicon.svg` → `src/app/icon.svg` (Next favicon); both copied to `public/` too.
- **Hero typography fix:** the per-sentence masks caused an optical size jump. Now a **single mask wipe** (uniform leading) + `text-balance` for clean wraps. VN reworded (was weak): **"Nhà máy của bạn là độc nhất. ERP cũng nên như thế."** (the brief's pre-blessed stronger cut). **One classy oxblood highlight** via `t.rich` `<hl>` tag — VN "độc nhất", EN "fit". HeroText now self-fetches translations.
- **VN copy:** pillar label "May đo cho bạn" → **"Tối ưu cho bạn"** (user; don't mirror EN literally). Other VN lines still verbatim from Content.md — broader naturalness pass available on request.
- **B/W transition (GLM inspiration):** Pillars and Closing+Footer are now **dark** via the `.dark` token swap (`className="dark bg-paper text-ink"` — same components, flipped palette). Rhythm: Hero(paper) · Problem(grey) · **Pillars(dark)** · Process(grey) · Audience(paper) · **Closing+Footer(dark)**.
- **Clever nav:** `mix-blend-difference` on a white-content nav → the wordmark auto-inverts (black over light sections, white over dark) as you scroll. Switcher gets a `tone="blend"` variant (white + opacity, no oxblood, since difference distorts color). This intentionally **goes beyond the original "light-dominant, no dark UI" floor** — sanctioned by the user's GLM direction.
- Aura now dark-friendly: vignette uses neutral black; grain uses `mix-blend-overlay`. On dark, the sweep reads as a soft spotlight glow.

## Revision pass 2 — fixes
- **Hero descender clip:** reveal-mask padding must be in `em` on the `h1` (em = headline font-size), NOT on the wrapper div (em ≈ 1rem there → way too small for an 80px headline). `pt-[0.06em] pb-[0.2em]` + `leading-[1.06]` on the h1 gives VN tone marks + descenders room inside `overflow-hidden`.
- **Dark aura too harsh:** added `.dark .aura-sweep` (white 0.12 + blur 20px) so on dark it's a soft ambient glow, not a spotlight; bumped `.dark --grid` to `#2b2b2e` so the blueprint reads. Light sweep unchanged.

### Screenshots that work here
- Gate 0 raw `google-chrome --headless=new --screenshot` froze (user's Chrome intercepts). **Use Playwright CLI driving system Chrome:** `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npx playwright screenshot --channel chrome --viewport-size W,H --wait-for-timeout 2600 URL out.png`. Reliable, isolated, waits for fonts + on-load animation.

### Carried into Gate 1
- **Hero must animate on LOAD (mask/stagger), not on scroll-into-view.** `Reveal` (Motion `whileInView`) is for below-fold sections; above-fold hero content wrapped in `whileInView` stays invisible until intersection (and never shows in single-frame capture). Build a dedicated on-load hero reveal.
- The Gate 0 `page.tsx` is a throwaway foundation-check specimen — replace with real Nav + Hero.

## Design System v2 (2026-07 — landing → unified system)
Grew the DS from "landing style" to one system for **marketing + ERP app + print reports** (spec: `style-guide/design_handoff_pantheus_v2/README.md`). Implemented in-repo, then re-synced to claude.ai/design.
- **Tokens (`globals.css`):** foundation unchanged. Added `--accent-strong` / `--accent-wash`; four **semantic families** success/warning/danger/info (each `base`/`-text`/`-bg`/`-border`, light + dark); **chart palette** `--chart-1..5`. `--destructive` now maps to `--danger` (rule: accent ≠ error — oxblood is brand/interaction, errors always use danger). Tailwind utilities exposed via `@theme inline` (`bg-success-bg`, `text-danger-text`, `border-info-border`, `bg-accent-wash`, `chart-*`) plus elevation `shadow-e1/e2/e3` (e0 = hairline only).
- **Mark:** swapped to the v2 single-stroke lambda ("option A", 24px grid, `stroke=currentColor fill=none`). Old filled letterform kept as `marks/MarkLegacy.tsx` for migration. `src/app/icon.svg` rebuilt with the same glyph.
- **New ERP components** in `src/components/erp/`: `StatusBadge`, `KpiCard`, `DataTable`(+`ProgressBar`), `SidebarNav`, `FormField`(+`Input`/`Textarea`/`Select`), `Toast`, `Modal` (radix Dialog, same primitive as Sheet). Presentational + token-driven; **not wired to a live route** (no ERP route exists) — they exist as DS components, exercised via `.design-sync/previews/`.
- **Atmosphere = marketing-only (hard rule).** `Grain`, `Vignette`, `LitGridAura`, `BlueprintCar`, `Reveal`, `HeroText`, `CTA`, `link-underline`, and `display`-size type belong to landing/marketing ONLY — never import them into an app/report layout. Already structurally true (all are page/section-scoped; none in `[locale]/layout.tsx`). Shared across all surfaces: color+semantic tokens, type scale, new Mark, Wordmark, Button, Sheet, Tooltip, accent focus ring.
- **`Vignette.tsx` `#000`** is a deliberate theme-independent literal (a vignette must darken corners in both modes; `var(--ink)` would invert it in dark) — see the comment there; do not "tokenize" it.
