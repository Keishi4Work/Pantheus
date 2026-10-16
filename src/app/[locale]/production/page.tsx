import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Eyebrow from "@/components/Eyebrow";
import ProductHero from "@/components/sections/ProductHero";
import Cards from "@/components/sections/Cards";
import Closing from "@/components/sections/Closing";
import Footer from "@/components/sections/Footer";
import Tour from "@/components/tour/Tour";
import ProductionPlan from "@/components/tour/ProductionPlan";
import { Chip, type Tone } from "@/components/tour/mock";
import {
  PRODUCTION_APPS,
  PRODUCTION_STOPS,
} from "@/components/tour/production";
import { mergeApps, mergeStops, type StopText } from "@/components/tour/stops";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Production.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ProductionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Production");
  const common = await getTranslations("Common.tour");

  const stops = mergeStops(
    t.raw("stops") as (StopText & { place: string })[],
    PRODUCTION_STOPS,
    (s) => ({ card: s.place, tab: s.n, where: `${s.n} ${s.short}` }),
  );

  return (
    <>
      <main className="flex-1">
        <ProductHero
          product="production"
          descriptor={t("hero.descriptor")}
          title={t.rich("hero.title", {
            acc: (c) => <span className="acc">{c}</span>,
          })}
          lead={t("hero.lead")}
          primary={t("hero.primary")}
          secondary={t("hero.secondary")}
          facts={t.raw("hero.facts")}
        />

        <Tour
          stops={stops}
          apps={mergeApps(t.raw("apps"), PRODUCTION_APPS)}
          nav={t.raw("nav")}
          plan={<ProductionPlan l={t.raw("plan")} />}
          token="square"
          brand={{
            name: t("brand.name"),
            kbd: t("brand.kbd"),
            poweredBy: t("brand.poweredBy"),
          }}
          text={t.raw("tour")}
          ui={{
            prev: common("prev"),
            close: common("close"),
            detail: common("detail"),
            next: common("next"),
            hintDetail: common("hintDetail"),
            hintZones: common("hintZones"),
            tags: t.raw("tour.tags"),
          }}
        />

        <Cards
          eyebrow={t("cards.eyebrow")}
          title={t("cards.title")}
          items={t.raw("cards.items")}
        />

        <section className="dark bg-paper py-[110px] text-ink max-[900px]:py-[84px]">
          <div className="wrap">
            <Eyebrow>{t("deploy.eyebrow")}</Eyebrow>
            <h2 className="h2 mt-5 mb-11 max-w-[780px]">{t("deploy.title")}</h2>
            <ul className="dep">
              {(
                t.raw("deploy.items") as { k: string; t: string; b: string }[]
              ).map((d) => (
                <li key={d.k}>
                  <span className="mono text-ink-soft">{d.k}</span>
                  <h3 className="h3">{d.t}</h3>
                  <p className="body text-[14px]">{d.b}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-[110px] max-[900px]:py-[84px]">
          <div className="wrap">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>{t("roadmap.eyebrow")}</Eyebrow>
                <h2 className="h2 mt-5 max-w-[680px]">{t("roadmap.title")}</h2>
              </div>
              <p className="body max-w-[380px]">{t("roadmap.body")}</p>
            </div>
            <ul className="rm">
              {(
                t.raw("roadmap.items") as {
                  t: string;
                  b: string;
                  tag: string;
                  tone: Tone;
                }[]
              ).map((r) => (
                <li key={r.t}>
                  <h3 className="h3">{r.t}</h3>
                  <p className="body">{r.b}</p>
                  <Chip tone={r.tone}>{r.tag}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Closing
          heading={t("closing.heading")}
          lead={t("closing.lead")}
          primary={{ label: t("closing.primary"), href: "#contact" }}
          secondary={{ label: t("closing.secondary"), href: "/office" }}
        />
      </main>
      <Footer />
    </>
  );
}
