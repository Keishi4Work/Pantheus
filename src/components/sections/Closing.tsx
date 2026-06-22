import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import LitGridAura from "@/components/aura/LitGridAura";
import BlueprintBike from "@/components/BlueprintBike";
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

      {/* manufacturing blueprint — draws in on scroll, faint behind the CTA */}
      <BlueprintBike className="pointer-events-none absolute top-1/2 left-[57%] hidden w-[900px] max-w-[64%] -translate-x-1/2 -translate-y-1/2 text-ink-soft opacity-[0.22] md:block" />

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
