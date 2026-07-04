import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import LitGridAura from "@/components/aura/LitGridAura";
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

      {/* drawing-sheet furniture — the closing reads as the title sheet of the
          blueprint set that began with the hero car: margin frame, center
          marks, and a title block signed at 1:1 scale (no template — drawn
          to the factory) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-4 border border-line/70 sm:inset-6" />
        <span className="absolute top-4 left-1/2 h-3 w-px -translate-x-1/2 bg-line sm:top-6" />
        <span className="absolute bottom-4 left-1/2 h-3 w-px -translate-x-1/2 bg-line sm:bottom-6" />
        <span className="absolute top-1/2 left-4 h-px w-3 -translate-y-1/2 bg-line sm:left-6" />
        <span className="absolute top-1/2 right-4 h-px w-3 -translate-y-1/2 bg-line sm:right-6" />

        <div className="absolute right-4 bottom-4 hidden font-mono text-[11px] tracking-[0.16em] text-muted-ink uppercase sm:right-6 sm:bottom-6 md:block">
          <div className="divide-y divide-line/70 border border-line/70 bg-paper/60">
            {[
              ["project", "Pantheus ERP"],
              ["scale", "1:1"],
              ["rev", "A"],
              ["sheet", "7/7"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-10 px-4 py-1.5"
              >
                <span className="text-muted-ink/60">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`relative z-10 ${CONTAINER} py-28 sm:py-40`}>
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
