"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * EN | VI toggle. Preserves the current path across locales.
 * `tone="blend"` is for the mix-blend nav (white + opacity, no color, since
 * mix-blend-difference would distort the oxblood accent).
 */
export default function LanguageSwitcher({
  className = "",
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "blend";
}) {
  const active = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Nav");

  const activeCls = tone === "blend" ? "text-white" : "text-accent-text";
  const inactiveCls =
    tone === "blend"
      ? "text-white/45 hover:text-white"
      : "text-muted-ink hover:text-ink";
  const sepCls = tone === "blend" ? "text-white/30" : "text-line-strong";
  const focusCls =
    tone === "blend"
      ? "focus-visible:outline-white"
      : "focus-visible:outline-accent";

  return (
    <div
      className={`flex items-center gap-1 font-mono text-xs tracking-[0.08em] ${className}`}
      role="group"
      aria-label={t("language")}
    >
      {routing.locales.map((locale, i) => {
        const isActive = locale === active;
        return (
          <span key={locale} className="flex items-center">
            {i > 0 && <span className={`px-1.5 ${sepCls}`}>/</span>}
            <button
              type="button"
              onClick={() => router.replace(pathname, { locale })}
              aria-current={isActive ? "true" : undefined}
              className={`uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${focusCls} ${
                isActive ? activeCls : inactiveCls
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
