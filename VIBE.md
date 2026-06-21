# Pantheus — Vibe & Design Language

## North star
**Monochrome, structural, engineered, high-end.** Abstract-modern: the idea of a *foundation* expressed through geometry and precision — never literal temples, columns, or marble. Quiet confidence over loud hype. Spend boldness in one place; keep everything else disciplined.

---

## References — take this, leave that
- **Palantir → palette & restraint.** Take: near-black canvas, dramatic negative space, monochrome authority, type doing the work. Leave: their information density and any chroma. We go *airier* than Palantir, not denser.
- **Base.vn → motion only.** Take: smooth scroll choreography, refined easing, polished micro-interactions, product shown cleanly. Leave: their color palette and illustration style entirely.

---

## The logo is the seed
Custom geometric monoline sans. The **A** is a lambda (Λ, no crossbar); the **E** is three stacked bars (≡). Architectural, precise, abstract. Derive the whole system from it:
- Monoline weight, geometric construction, generous letter-spacing → echo in headings and dividers.
- The **triple-bar E** and **lambda A** become reusable graphic marks — section dividers, list bullets, the loading/answer cursor in the AI demo. This is the page's fingerprint; nothing generic should compete with it.

---

## Color — monochrome system (4 values + scale)
- `--ink` **#0E0E10** — near-black canvas (hero + signature sections)
- `--paper` **#F3F2EF** — warm off-white (light sections; the logo sits on light grey, so keep light warm-neutral, never sterile #FFF)
- `--text-on-dark` **#ECECEA**
- `--text-on-light` **#141416**
- Grey scale for hairlines / secondary text / borders: **#1E1E20 · #2C2C2E · #6B6B70 · #A8A8AD**

**Accent = contrast itself.** Pure white as the highlight note on near-black. No chromatic accent by default — that restraint *is* the classy/high-end signal. (Optional, reserved for the AI demo only: a single ultra-sparse cool signal, used on one element, never elsewhere. Default = none.)

> Note: a near-black canvas with one bright accent is a common AI-default look. We dodge it by (a) using *no* bright accent and (b) deriving the signature from the actual logo + the e-bike domain, not from generic hairline decoration.

---

## Typography — make it the personality
**Must fully support Vietnamese diacritics** (stacked tone marks). Test string before committing: *"Nhà máy của bạn không theo khuôn mẫu"* plus tone-heavy glyphs (ự ặ ỡ ễ ḍ).

- **Display / headings:** geometric grotesque that harmonizes with the logo *and* has full VN coverage — **Geist**, **Inter Display**, or **Be Vietnam Pro** (Be Vietnam Pro = guaranteed Vietnamese). Big, tight tracking, deliberate weights.
- **Body:** **Be Vietnam Pro** or **Inter** — quiet, legible at length, generous leading.
- **Utility / mono:** **Geist Mono** / **JetBrains Mono** / **IBM Plex Mono** — for data, the AI demo, and the one numbered sequence. The mono reinforces the engineering (blueprint) half of the vibe.

Set a real scale with intent — don't let type be a neutral delivery vehicle. The display face used with restraint; mono used as a precise counterpoint.

---

## Layout & structure
- Strict modular grid (12-col), **wide margins, lots of negative space** — airier than the reference.
- **Hairline rules (1px greys)** as structural signature, used sparingly — structure, not newspaper decoration.
- Strong **verticals** and a faint background grid to suggest *foundation* abstractly. No literal columns.
- **Blueprint treatment** for any product visual: precise line-work, schematic, mono labels.
- **Numbering caveat:** use 01 / 02 / 03 markers *only* on "How we work" (a genuine sequence). The five pillars are parallel, not ordered — do **not** number them; differentiate them by label + the lambda/triple-bar mark instead.

---

## Signature element (spend boldness here)
**The live "Ask your factory" moment.** An input where a visitor types a plain question and watches a real answer stream in — cursor styled from the logo's geometry. It proves Pillar 5, embodies the brand, and is the one thing the page is remembered by. (Buildable later as a working mini-demo.)

**Strong secondary visual:** an **exploded line-diagram of an e-bike** — white/grey lines on near-black, technical-drawing aesthetic. Domain-true, not stock, and instantly says *we model your product*. Use as hero backdrop or a single feature visual — never both competing with the AI demo.

---

## Motion (Base.vn-grade, restrained)
- Scroll-triggered reveals: fade + subtle translate-up, lightly staggered.
- Easing: custom ease-out, ~400–700ms. **Never bouncy or playful** — premium and quiet. Over-animation reads AI-generated; less is more.
- Subtle parallax on the hero grid/background only.
- Micro: hairline underlines drawing on hover, mono labels, cursor-aware subtlety.
- AI demo: typewriter/streamed reveal — the single orchestrated moment.
- Quality floor: respect `prefers-reduced-motion`, GPU transforms, no jank, visible keyboard focus, responsive to mobile.

---

## Imagery — don'ts
- **No** stock factory/worker photos.
- **No** literal Greek columns, marble, temples, or gods — abstract, not literal Pantheon.
- **No** heavy gradients, bubbly illustration, rounded SaaS look, emoji.
- **Yes** line-art, schematic, monochrome, geometric, derived-from-logo marks.

---

## Do / Don't
- **Do:** whitespace, hairlines, big deliberate type, mono counterpoint, restraint, structural geometry, one signature.
- **Don't:** color, clutter, clichés, literal mythology, numbered parallel lists, scattered animation.

## Mood words
Foundational · precise · sovereign · engineered · quiet confidence · high-end · modern-classical (abstractly).