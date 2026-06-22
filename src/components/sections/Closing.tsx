import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import LitGridAura from "@/components/aura/LitGridAura";
import Mark from "@/components/marks/Mark";
import TripleBarMark from "@/components/marks/TripleBarMark";
import CTA from "@/components/CTA";

const CONTAINER = "mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16";

export default async function Closing() {
  const t = await getTranslations("Closing");

  return (
    <section
      id="contact"
      className="dark relative isolate scroll-mt-24 overflow-hidden bg-paper"
    >
      <LitGridAura />

      {/* monumental Λ≡ monogram — the brand foundation, an oversized watermark
          that bleeds past the edges (faint, so the ≡ never reads as UI) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      >
        <div className="flex translate-x-[26%] items-center gap-[1vw] text-line/60">
          <Mark className="h-[84vw] w-auto md:h-[56vw]" />
          <TripleBarMark
            className="h-[60vw] w-auto md:h-[42vw]"
            strokeWidth={0.6}
          />
        </div>
      </div>

      <div className={`relative z-10 ${CONTAINER} py-28 sm:py-40`}>
        {/* foundation echo — bookends the hero's ground-line */}
        <div aria-hidden="true" className="mb-14 flex flex-col gap-[3px]">
          <span className="h-px w-full bg-line-strong" />
          <span className="h-px w-full bg-line" />
          <span className="h-px w-full bg-line" />
        </div>

        <Reveal>
          <h2 className="max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink">
            {t("heading")}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-7 max-w-xl font-sans text-lg leading-relaxed text-ink-soft">
            {t("subline")}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10">
            <CTA>{t("cta")}</CTA>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
