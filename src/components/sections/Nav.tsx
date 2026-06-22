"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Wordmark from "@/components/marks/Wordmark";
import TripleBarMark from "@/components/marks/TripleBarMark";
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
 * Fixed nav with `mix-blend-difference`: a single white wordmark auto-inverts
 * (black over the light sections, white over the dark ones) as the page scrolls
 * under it. Always transparent — no scrolled background needed.
 */
export default function Nav() {
  const t = useTranslations("Nav");

  const links = [
    { href: "#approach", label: t("approach") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 text-white sm:px-10 lg:px-16">
        <Link
          href="/"
          aria-label="Pantheus"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Wordmark className="h-[18px] w-auto" />
        </Link>

        {/* desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.12em] text-white/70 transition-opacity hover:text-white focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
            >
              {l.label}
            </a>
          ))}
          <span className="h-4 w-px bg-white/30" aria-hidden="true" />
          <LanguageSwitcher tone="blend" />
        </nav>

        {/* mobile */}
        <div className="flex items-center gap-5 md:hidden">
          <LanguageSwitcher tone="blend" />
          <Sheet>
            <SheetTrigger
              aria-label={t("menu")}
              className="flex h-10 w-10 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <TripleBarMark className="h-6 w-6" strokeWidth={2} />
            </SheetTrigger>
            {/* Sheet content renders in a portal — outside the blend layer */}
            <SheetContent side="right" className="bg-paper">
              <SheetHeader>
                <SheetTitle className="font-display tracking-[-0.01em] text-ink">
                  Pantheus
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col px-4">
                {links.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <a
                      href={l.href}
                      className="border-b border-line py-4 font-display text-xl text-ink"
                    >
                      {l.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
