import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Eyebrow from "@/components/Eyebrow";
import ProductHero from "@/components/sections/ProductHero";
import Cards from "@/components/sections/Cards";
import Closing from "@/components/sections/Closing";
import Footer from "@/components/sections/Footer";
import Tour from "@/components/tour/Tour";
import OfficePlan from "@/components/tour/OfficePlan";
import { OFFICE_APPS, OFFICE_STOPS } from "@/components/tour/office";
import { mergeApps, mergeStops, type StopText } from "@/components/tour/stops";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Office.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function OfficePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Office");
  const common = await getTranslations("Common.tour");

  const stops = mergeStops(
    t.raw("stops") as (StopText & { time: string })[],
    OFFICE_STOPS,
    (s) => ({ card: s.time, tab: `${s.n} · ${s.time}`, where: s.time }),
  );

  return (
    <>
      <main className="flex-1">
        <ProductHero
          eyebrow={t("hero.eyebrow")}
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
          apps={mergeApps(t.raw("apps"), OFFICE_APPS)}
          nav={t.raw("nav")}
          plan={<OfficePlan l={t.raw("plan")} />}
          token="round"
          brand={{ name: "Pantheus Office", dot: "", kbd: t("brand.kbd") }}
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
          <div className="wrap split">
            <div>
              <Eyebrow>{t("dogfood.eyebrow")}</Eyebrow>
              <h2 className="h2 mt-5">{t("dogfood.title")}</h2>
              <p className="body mt-5 max-w-[480px]">{t("dogfood.body")}</p>
            </div>
            <div>
              <div className="tb">
                {(
                  t.raw("dogfood.stats") as {
                    k: string;
                    v: string;
                    l: string;
                  }[]
                ).map((s) => (
                  <div key={s.k}>
                    <span className="mono text-ink-soft">{s.k}</span>
                    <b>{s.v}</b>
                    <span className="body text-[13px]">{s.l}</span>
                  </div>
                ))}
              </div>
              <p className="mono mt-3 text-ink-soft">{t("dogfood.note")}</p>
            </div>
          </div>
        </section>

        <Closing
          heading={t("closing.heading")}
          lead={t("closing.lead")}
          primary={{ label: t("closing.primary"), href: "#contact" }}
          secondary={{ label: t("closing.secondary"), href: "/production" }}
        />
      </main>
      <Footer />
    </>
  );
}
