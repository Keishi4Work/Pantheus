"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** VI / EN toggle. Preserves the current path across locales. */
export default function LanguageSwitcher() {
  const active = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Nav");

  return (
    <div
      className="mono flex items-center"
      role="group"
      aria-label={t("language")}
    >
      {routing.locales.map((locale, i) => {
        const isActive = locale === active;
        return (
          <span key={locale} className="flex items-center">
            {i > 0 && (
              <span className="px-0.5 text-ink-soft" aria-hidden="true">
                /
              </span>
            )}
            <button
              type="button"
              onClick={() => router.replace(pathname, { locale })}
              aria-current={isActive ? "true" : undefined}
              className={`min-h-11 px-1.5 uppercase transition-colors focus-visible:outline-2 focus-visible:outline-accent-text ${
                isActive ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {locale}
            </button>
          </span>
        );
      })}
    </div>
  );
}
