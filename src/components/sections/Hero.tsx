import LitGridAura from "@/components/aura/LitGridAura";
import HeroText from "@/components/HeroText";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-paper"
    >
      <LitGridAura />

      {/* centered thesis */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-16 sm:px-10 lg:px-16">
          <HeroText />
        </div>
      </div>

      {/* foundation ground-line — the triple-bar (≡) as the base the hero stands on */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10 sm:px-10 lg:px-16">
        <div className="mb-3 flex justify-end">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-muted-ink"
            aria-hidden="true"
          >
            <path d="M12 5v14" />
            <path d="M6 13l6 6 6-6" />
          </svg>
        </div>
        <div aria-hidden="true" className="flex flex-col gap-[3px]">
          <span className="h-px w-full bg-line-strong" />
          <span className="h-px w-full bg-line" />
          <span className="h-px w-full bg-line" />
        </div>
      </div>
    </section>
  );
}
