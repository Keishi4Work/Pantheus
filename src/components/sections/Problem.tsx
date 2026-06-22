import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";

const CONTAINER = "mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16";

export default async function Problem() {
  const t = await getTranslations("Problem");
  const body = t("body");

  // Lift the opening quoted question into a pull-quote; keep the rest as support.
  const match = body.match(/^[“"]([^”"]+)[”"]\s*([\s\S]*)$/);
  const quote = match?.[1] ?? "";
  const rest = match?.[2] ?? body;

  return (
    <section className="bg-section">
      <div className={`${CONTAINER} py-24 sm:py-32`}>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.025em] text-ink">
              {t("heading")}
            </h2>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            {quote && (
              <Reveal delay={0.05}>
                <p className="font-display text-2xl font-medium leading-snug tracking-[-0.01em] text-ink sm:text-[1.75rem]">
                  <span className="text-muted-ink">“</span>
                  {quote}
                  <span className="text-muted-ink">”</span>
                </p>
              </Reveal>
            )}
            <Reveal delay={0.12}>
              <p className="mt-6 font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
                {rest}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
