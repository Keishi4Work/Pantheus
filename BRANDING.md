# Pantheus — Branding & Theme

> Initial guide, not a cage. Tokens and rules below are the floor; the coding agent is encouraged to explore the alternatives flagged in `Vibe.md` (exploded-bike signature, lit-grid variations, pillar layouts) and propose before committing big visual bets.

## North star
Monochrome, structural, engineered, high-end. **Light-dominant** (dark mode comes later). Abstract-modern — the idea of a *foundation* expressed through geometry and precision, never literal temples or columns. Quiet confidence; spend boldness in one place.

---

## Palette — light theme (B&W + one whisper accent)
Anchored to the real logo ink (`#1E1E1E`). Hex below; Tailwind v4 / shadcn use OKLCH — convert on setup (non-breaking). Build these as CSS variables so dark mode is a token swap later.

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F5F4F0` | page background (warm off-white — never sterile #FFF) |
| `--surface` | `#FAF9F6` | elevated surfaces / cards |
| `--section` | `#ECEBE6` | alternating section bands (the logo's grey context) |
| `--ink` | `#1E1E1E` | primary text, wordmark, solid buttons |
| `--ink-soft` | `#5A5954` | secondary text |
| `--muted` | `#8B8A84` | captions, tertiary, eyebrows |
| `--line` | `#E2E1DB` | hairlines, borders |
| `--line-strong` | `#D2D1CA` | active/structural rules |
| `--grid` | `#ECEBE6` | aura grid lines (very faint) |
| `--accent` | `#9A7B4F` | **whisper accent** — muted bronze |
| `--accent-text` | `#7A5E36` | darker accent for small text/links (AA on paper) |

**Accent = the single adjustable choice.** Default: muted bronze (warm, premium, ties to the classical heritage of the name, distinctly not-blue). Swap candidate: oxblood `#7A2E2E` (editorial/intellectual). Pick one — agent may build with bronze until told otherwise.

**Accent discipline (whisper only):** active nav indicator, link underline-draw on hover, focus ring, the lambda mark, one hairline highlight. **Never** as button fills or large areas; keep it under ~2% of any viewport. Buttons stay ink (solid `--ink` on `--paper`, or outline). Aura stays **pure monochrome** — no accent in it.

**Dark mode (later, don't build yet):** same token names, flipped — `--paper`→`~#161616`, `--ink`→`~#ECEBE6`, lines→warm darks. Just structure the CSS vars now.

---

## Typography
Logo font is **Manrope** (the wordmark is Manrope with a custom lambda **A** and triple-bar **E** — those two glyphs are unique logo treatment, not for body text). **Manrope covers Vietnamese** — verified — so one superfamily carries the whole bilingual site.

| Role | Face | Notes |
|---|---|---|
| Display / headings | **Manrope** 600–800 | tight tracking (~-0.02em at large sizes) |
| Body | **Manrope** 400–500 | leading 1.5–1.6 |
| Utility / mono | **Geist Mono** (or JetBrains Mono) | eyebrows, data, captions, the numbered process |
| Wordmark | the logo SVG | don't re-typeset it |

- **VN fallback stack:** `"Manrope", "Be Vietnam Pro", system-ui, sans-serif`. Test tone-heavy strings before locking: *"Nhà máy của bạn không theo khuôn mẫu"*, plus `ự ặ ỡ ễ ộ`.
- Mono is for EN/numeric labels — VN coverage there is non-blocking.
- Load via `next/font` (self-host, `display: swap`, subset `latin` + `latin-ext`/Vietnamese).

**Type scale (responsive, clamp):** display-1 ~3.5–5.5rem · display-2 ~2.5–3.5rem · h ~1.5–2rem · body ~1–1.125rem · small ~0.875rem · mono-caption ~0.75rem (uppercase, letter-spacing ~0.08em).

---

## Aura (background)
**Lit structural grid**, kept **black & white** (no blue): a faint grid (`--grid`) with a soft, slightly brighter monochrome sweep moving slowly across it — like a scanner passing over a blueprint, but greyscale. Layer **fine grain + a soft warm-grey vignette** underneath everything for analog depth. On the light theme this is subtle by design — atmosphere, not decoration.

- Hero + closing section carry the aura; mid-sections stay clean.
- **CSS / Canvas only — no WebGL** (per stack choice). Build details in `Techstack.md`.
- Respect `prefers-reduced-motion` (freeze the sweep); lighten/disable on mobile for perf.

---

## Motifs & structure
- **Lambda (Λ) and triple-bar (≡)** from the logo are the reusable graphic marks — section dividers, list markers, the active-state accent. This is the page's fingerprint; nothing generic competes with it.
- **Hairline grid** and **structural verticals** to suggest *foundation* abstractly — no literal columns.
- **Numbered markers (01/02/03) only on "How we work"** (a real sequence). The five pillars are **parallel — do not number them**; differentiate by label + the lambda/triple-bar mark.

## Motion (summary; full spec in Techstack)
Base.vn-grade and restrained: scroll-triggered fade + subtle translate-up, lightly staggered; custom ease-out ~400–700ms; **never bouncy or scattered** (over-animation reads AI-generated). Hairline underline-draw on hover. One orchestrated moment max per section.

## Do / Don't
- **Do:** whitespace, hairlines, big deliberate Manrope type, mono counterpoint, restraint, structural geometry, one signature.
- **Don't:** color beyond the whisper accent, clutter, numbered parallel lists, literal Greek columns/marble, stock factory photos, bouncy/scattered motion, emoji.

## Mood
Foundational · precise · sovereign · engineered · quiet confidence · high-end · modern-classical (abstractly).