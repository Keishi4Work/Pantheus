import { getTranslations } from "next-intl/server";
import Wordmark from "@/components/marks/Wordmark";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const CONTAINER = "mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="dark border-t border-line bg-paper">
      <div className={`${CONTAINER} py-14 sm:py-16`}>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark className="h-5 w-auto text-ink" />
            <p className="mt-5 font-sans text-sm leading-relaxed text-ink-soft">
              {t("wordmarkLine")}
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-ink">
              {t("tagline")}
            </p>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <nav className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
              <a href="#approach" className="link-underline transition-colors hover:text-ink">
                {t("approach")}
              </a>
              <span className="text-line-strong" aria-hidden="true">
                ·
              </span>
              <a href="#contact" className="link-underline transition-colors hover:text-ink">
                {t("contact")}
              </a>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-ink">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
