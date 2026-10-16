"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Wordmark from "@/components/marks/Wordmark";
import TripleBarMark from "@/components/marks/TripleBarMark";
import ProductMark from "@/components/marks/ProductMark";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Sits at the top of every page's dark hero (not fixed): the hero already
 * frames it, so it needs no scrolled state. Under 900px the links fold into a
 * sheet; the language switch stays visible.
 */
export default function Nav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  const pages = [
    { href: "/office", label: "Office", product: "office" },
    { href: "/production", label: "Production", product: "production" },
  ] as const;
  const approach = { pathname: "/", hash: "approach" };

  return (
    <header className="relative z-10 border-b border-line">
      <div className="wrap flex min-h-[68px] items-center justify-between gap-7">
        <Link href="/" aria-label={t("home")} className="nav-link text-ink">
          <Wordmark className="h-[21px] w-auto" />
        </Link>

        <nav
          aria-label={t("main")}
          className="mono hidden items-center gap-[26px] min-[901px]:flex"
        >
          {pages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              aria-current={pathname === p.href ? "page" : undefined}
              className="nav-link gap-2"
            >
              <ProductMark product={p.product} size={16} />
              {p.label}
            </Link>
          ))}
          <Link href={approach} className="nav-link">
            {t("approach")}
          </Link>
          <a href="#contact" className="nav-link">
            {t("contact")}
          </a>
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-3 min-[901px]:hidden">
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger
              aria-label={t("menu")}
              className="flex h-11 w-11 items-center justify-center text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
            >
              <TripleBarMark className="h-6 w-6" strokeWidth={2} />
            </SheetTrigger>
            <SheetContent side="right" className="light bg-paper text-ink">
              <SheetHeader>
                <SheetTitle className="text-ink">Pantheus</SheetTitle>
              </SheetHeader>
              <nav aria-label={t("main")} className="flex flex-col px-4">
                {pages.map((p) => (
                  <SheetClose asChild key={p.href}>
                    <Link
                      href={p.href}
                      aria-current={pathname === p.href ? "page" : undefined}
                      className="flex items-center gap-3 border-b border-line py-4 text-xl font-semibold"
                    >
                      <ProductMark product={p.product} size={20} />
                      {p.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href={approach}
                    className="border-b border-line py-4 text-xl font-semibold"
                  >
                    {t("approach")}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href="#contact"
                    className="border-b border-line py-4 text-xl font-semibold"
                  >
                    {t("contact")}
                  </a>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
