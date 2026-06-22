import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Vietnamese is the default audience; `as-needed` keeps the VN root URL clean (`/`),
  // English lives at `/en`.
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
  // Deterministic default: `/` always serves VI regardless of browser language;
  // visitors switch to EN via the toggle (or land on /en directly).
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
