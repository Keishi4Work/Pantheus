import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";

const CONTAINER = "mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16";
const STEPS = ["step1", "step2", "step3"] as const;

// A real sequence — the one place numbering (01/02/03, mono) is allowed.
export default async function Process() {
  const t = await getTranslations("Process");

  return (
    <section id="process" className="scroll-mt-24 bg-section">
      <div className={`${CONTAINER} py-24 sm:py-32`}>
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.025em] text-ink">
            {t("heading")}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <Reveal
              key={step}
              delay={i * 0.08}
              className="border-t border-line-strong pt-6"
            >
              <span className="font-mono text-sm tracking-[0.1em] text-muted-ink">
                0{i + 1}
              </span>
              <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-0.01em] text-ink">
                {t(`${step}.title`)}
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-ink-soft">
                {t(`${step}.body`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
