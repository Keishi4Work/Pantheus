import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import Mark from "@/components/marks/Mark";

const CONTAINER = "mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16";

// Parallel, NOT a sequence — never numbered. Differentiated by label + the Λ mark.
const KEYS = [
  "builtAroundYou",
  "runsOnYourGround",
  "outcomes",
  "builtForTheFloor",
  "askYourFactory",
] as const;

export default async function Pillars() {
  const t = await getTranslations("Pillars");

  return (
    <section id="approach" className="dark scroll-mt-24 bg-paper text-ink">
      <div className={`${CONTAINER} py-24 sm:py-32`}>
        <div className="border-b border-line">
          {KEYS.map((key, i) => (
            <Reveal
              key={key}
              delay={i * 0.05}
              className="grid grid-cols-1 gap-4 border-t border-line py-9 md:grid-cols-12 md:items-baseline md:gap-8 md:py-11"
            >
              <div className="flex items-start gap-3 md:col-span-3">
                <Mark className="mt-1 h-[15px] w-auto shrink-0 text-accent" />
                <span className="font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-muted-ink">
                  {t(`${key}.label`)}
                </span>
              </div>

              <h3 className="font-display text-[1.5rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink md:col-span-5 md:text-[1.7rem]">
                {t(`${key}.headline`)}
              </h3>

              <p className="font-sans text-base leading-relaxed text-ink-soft md:col-span-4">
                {t(`${key}.body`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
