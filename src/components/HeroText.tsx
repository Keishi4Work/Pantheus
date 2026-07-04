"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { useHydrated } from "@/lib/useHydrated";
import CTA from "@/components/CTA";
import Mark from "@/components/marks/Mark";

const EASE = [0.22, 1, 0.36, 1] as const;
// pt/pb are in em (headline font-size) so they scale with the type and give
// VN stacked tone marks + descenders (g, y) room inside the reveal mask.
const HEADLINE =
  "max-w-5xl text-balance pt-[0.06em] pb-[0.2em] font-display text-[clamp(2.4rem,6.2vw,5rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink";
const EYEBROW =
  "mb-7 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-ink";
const SUBHEAD =
  "mt-8 max-w-2xl font-sans text-lg leading-relaxed text-ink-soft sm:text-xl";

// One classy highlight — a single oxblood word in an otherwise monochrome hero.
const hl = (chunks: ReactNode) => (
  <span className="text-accent-text">{chunks}</span>
);

/**
 * Hero copy with an on-LOAD reveal: the headline wipes up out of a single mask
 * (uniform leading — no per-sentence optical jump), then subhead + CTA fade up.
 * Static under prefers-reduced-motion.
 */
export default function HeroText() {
  const t = useTranslations("Hero");
  // two-pass: SSR can't know the motion preference — the hydration render must
  // match the server (animated variant), the static variant applies after.
  const rm = useReducedMotion();
  const reduce = useHydrated() && !!rm;

  // Two parts so the turn ("ERP cũng nên như thế.") always starts on its own
  // line — rendered as block spans inside one mask (no optical jump returns).
  const headline = (
    <>
      <span className="block">{t.rich("headlineLead", { hl })}</span>
      <span className="block">{t("headlineTurn")}</span>
    </>
  );

  const eyebrow = (
    <>
      <Mark className="h-[0.95em] w-auto text-ink" />
      {t("tagline")}
    </>
  );

  if (reduce) {
    return (
      <div>
        <p className={EYEBROW}>{eyebrow}</p>
        <h1 className={HEADLINE}>{headline}</h1>
        <p className={SUBHEAD}>{t("subhead")}</p>
        <div className="mt-10">
          <CTA>{t("cta")}</CTA>
        </div>
      </div>
    );
  }

  return (
    <div>
      <motion.p
        className={EYEBROW}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {eyebrow}
      </motion.p>

      <div className="overflow-hidden">
        <motion.h1
          className={HEADLINE}
          initial={{ y: "118%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        >
          {headline}
        </motion.h1>
      </div>

      <motion.p
        className={SUBHEAD}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
      >
        {t("subhead")}
      </motion.p>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
      >
        <CTA>{t("cta")}</CTA>
      </motion.div>
    </div>
  );
}
