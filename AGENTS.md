# AGENTS.md — Pantheus Landing Page

Brief for the coding agent building this site. Read all docs before starting. Follow the hard rules exactly; use the latitude where marked.

## Doc map
- **`Context.md`** — why this exists, positioning, audience, tone. Don't contradict it.
- **`Content.md`** — bilingual EN/VI copy. **Source of truth.** Don't rewrite the EN or VN; both must render. Strings go into `messages/en.json` + `messages/vi.json`.
- **`Vibe.md`** — design language *and the alternatives to explore*.
- **`Branding.md`** — palette + type tokens. **Derive every color and type decision from here.**
- **`Techstack.md`** — stack, setup commands, folder structure, i18n config.
- **`Layout.md`** — section order, wireframes, responsive behavior.

## Hard rules (do not deviate)
1. **Tokens only.** Every color/type value comes from `Branding.md`. Base is B&W: warm off-white `--paper`, ink `#1E1E1E`, plus **one whisper accent** (bronze, default) used sparingly per the accent-discipline rules. No other color.
2. **Light-dominant now.** Build CSS-variable tokens structured so dark mode is a later swap. **Do not build the dark UI yet.**
3. **Bilingual via next-intl.** EN + VI, never hardcode strings. Ensure **Vietnamese diacritics render** (Manrope + fallback stack); test tone-heavy strings before shipping.
4. **No WebGL / Three.js.** The aura is **CSS / Canvas**. Animation is **Motion + Lenis**, restrained — no bouncy or scattered effects.
5. **No AI demo in v1.** Omit/placeholder it. The signature is the **typographic hero + lit-grid aura**.
6. **CTA is a placeholder** (`#` / `mailto:`). No backend or form service.
7. **Pillars are parallel — never numbered.** Numbered markers (01/02/03) only on "How we work."
8. **shadcn is scaffolding, not the look.** Keep the custom design; pull in minimal components only.
9. **Assets:** use the provided logo SVG (ink `#1E1E1E`). No stock photos, no literal Greek columns/marble.
10. **Quality floor:** static render where possible; respect `prefers-reduced-motion`; visible keyboard focus; AA contrast (use `--accent-text` for small accent text); responsive to mobile.

## Latitude (encouraged to explore — propose before big bets)
The brief sets a floor, not a ceiling. Actively explore the alternatives flagged in `Vibe.md` / `Layout.md`:
- The **exploded e-bike SVG signature** (assembles on scroll) — pursue if an accurate asset is available; otherwise keep the typographic signature.
- **Lit-grid aura** execution variations (within monochrome).
- **Pillar layout** options (hairline-row stack vs grid).
- **Section transitions** and the optional **accent bloom**.
Show options when a visual bet is significant; don't silently ship a big divergence.

## Workflow (human-gated)
1. Plan — confirm folder structure + token setup before building UI.
2. Build section by section (see `Layout.md` order).
3. Stop at a review gate after each major section; Keishi reviews and approves before continuing.
4. Keep notes on what was tried so later passes don't repeat dead ends.

## Conventions
- `src/` dir, `@/*` alias, pages under `app/[locale]/`, copy in `messages/`, tokens in `styles/globals.css`.
- TypeScript strict. Commit before any `shadcn` re-init (it overwrites components).
- Follow current next-intl / shadcn / Tailwind v4 docs at build time (Next.js 16 `proxy.ts` vs `middleware.ts` may have shifted — verify).