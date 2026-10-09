import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Eyebrow from "@/components/Eyebrow";
import HeroFrame from "@/components/sections/HeroFrame";
import Closing from "@/components/sections/Closing";
import Footer from "@/components/sections/Footer";
import ProductSheets from "@/components/home/ProductSheets";
import Approach from "@/components/home/Approach";
import {
  FigLoop,
  FigProcess,
  FigRoles,
} from "@/components/home/ApproachFigures";
import ProductShowcase from "@/components/home/ProductShowcase";
import AskDemo from "@/components/home/AskDemo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <>
      <main className="flex-1">
        <HeroFrame className="pb-[72px]">
          <div className="tblock" aria-hidden="true">
            <span>Project</span>
            <span>Pantheus</span>
            <span>Scale</span>
            <span>1:1</span>
            <span>Rev</span>
            <span>B</span>
            <span>Sheet</span>
            <span>1/3</span>
          </div>
          <div className="wrap pt-28 max-[900px]:pt-20">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="h1 mt-[26px] max-w-[940px]">
              {t.rich("hero.title", {
                acc: (c) => <span className="acc">{c}</span>,
              })}
            </h1>
            <p className="lead mt-7 max-w-[640px]">{t("hero.lead")}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="btn btn-solid" href="#contact">
                {t("hero.primary")} <span className="arr">→</span>
              </a>
              <a className="btn" href="#products">
                {t("hero.secondary")} <span className="arr">↓</span>
              </a>
            </div>
            <ProductSheets />
          </div>
        </HeroFrame>

        <section className="py-[110px] max-[900px]:py-[84px]">
          <div className="wrap split">
            <h2 className="h2">{t("problem.title")}</h2>
            <div className="flex flex-col gap-[22px] pt-2">
              <p className="text-[26px] leading-[1.35] font-medium tracking-[-0.01em] max-[560px]:text-[22px]">
                {t("problem.quote")}
              </p>
              <p className="body">{t("problem.body")}</p>
            </div>
          </div>
        </section>

        <section
          id="approach"
          className="sec dark overflow-hidden bg-paper text-ink"
        >
          <div className="wrap">
            <Eyebrow>{t("approach.eyebrow")}</Eyebrow>
            <h2 className="h2 mt-[22px] mb-14 max-w-[820px]">
              {t("approach.title")}
            </h2>
            <Approach
              steps={t.raw("approach.steps")}
              figures={[
                <FigProcess key="process" l={t.raw("approach.fig.process")} />,
                <FigLoop key="loop" l={t.raw("approach.fig.loop")} />,
                <FigRoles key="roles" l={t.raw("approach.fig.roles")} />,
              ]}
              shipped={t.raw("approach.shipped")}
              labels={{
                group: t("approach.group"),
                gets: t("approach.gets"),
                prev: t("approach.prev"),
                next: t("approach.next"),
              }}
            />
          </div>
        </section>

        <section
          id="products"
          className="pt-[110px] pb-10 max-[900px]:pt-[84px]"
        >
          <div className="wrap">
            <Eyebrow>{t("products.eyebrow")}</Eyebrow>
            <h2 className="h2 mt-[22px] mb-10 max-w-[820px]">
              {t("products.title")}
            </h2>
            <ProductShowcase />
          </div>
        </section>

        <section className="sec dark bg-paper text-ink">
          <div className="wrap">
            <Eyebrow>{t("principles.eyebrow")}</Eyebrow>
            <h2 className="h2 mt-[22px] mb-14 max-w-[820px]">
              {t("principles.title")}
            </h2>
            {(
              t.raw("principles.items") as {
                label: string;
                title: string;
                body: string;
              }[]
            ).map((p) => (
              <div key={p.label} className="prow">
                <Eyebrow>{p.label}</Eyebrow>
                <h3 className="h3">{p.title}</h3>
                <p className="body">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sec bg-section">
          <AskDemo
            qs={t.raw("ai.qs")}
            labels={{
              group: t("ai.group"),
              who: t("ai.who"),
              sample: t("ai.sample"),
              placeholder: t("ai.placeholder"),
            }}
          >
            <Eyebrow>{t("ai.eyebrow")}</Eyebrow>
            <h2 className="h2 mt-[22px]">{t("ai.title")}</h2>
            <p className="body mt-5 max-w-[460px]">{t("ai.body")}</p>
          </AskDemo>
        </section>

        <section className="py-[110px] max-[900px]:py-[84px]">
          <div className="wrap">
            <Eyebrow>{t("how.eyebrow")}</Eyebrow>
            <h2 className="h2 mt-[22px] mb-12">{t("how.title")}</h2>
            <ol className="how">
              {(t.raw("how.steps") as { t: string; b: string }[]).map(
                (s, i) => (
                  <li key={s.t}>
                    <span className="mono text-ink-soft">0{i + 1}</span>
                    <h3 className="h3">{s.t}</h3>
                    <p className="body">{s.b}</p>
                  </li>
                ),
              )}
            </ol>
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
