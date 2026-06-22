import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import Mark from "@/components/marks/Mark";

const CONTAINER = "mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16";

// One short statement, lots of air.
export default async function Audience() {
  const t = await getTranslations("Audience");

  return (
    <section className="bg-paper">
      <div className={`${CONTAINER} py-28 sm:py-40`}>
        <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-ink">
          <Mark className="h-[0.95em] w-auto" />
          {t("heading")}
        </p>
        <Reveal delay={0.05}>
          <p className="mt-8 max-w-4xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.18] tracking-[-0.02em] text-ink">
            {t("body")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
