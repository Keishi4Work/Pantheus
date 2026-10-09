import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Mark from "@/components/marks/Mark";
import { Chip, MockTable, MockTabs } from "@/components/tour/mock";
import { PRODUCTION_APPS } from "@/components/tour/production";
import type { MockApp, StopText } from "@/components/tour/stops";

type Inbox = {
  tabs: string[];
  groups: {
    head: string;
    action: string;
    items: { t: string; s: string; due?: string }[];
  }[];
};

/**
 * One row per product: what it does, the route its page walks through, and a
 * glimpse of a real screen. Routes and the production order screen come from
 * the product pages' own copy, so the two never drift apart.
 */
export default async function ProductShowcase() {
  const t = await getTranslations("Home.products");
  const office = await getTranslations("Office");
  const production = await getTranslations("Production");

  const officeStops = office.raw("stops") as (StopText & { time: string })[];
  const productionStops = production.raw("stops") as StopText[];
  const inbox = t.raw("office.inbox") as Inbox;
  const order = production.raw("apps.mo") as Omit<MockApp, "cols" | "bar">;

  return (
    <>
      <Row
        top={t("office.top")}
        name="Pantheus Office"
        desc={t("office.desc")}
        feat={t.raw("office.feat") as string[]}
        route={officeStops.slice(1).map((s) => `${s.time} ${s.short}`)}
        link={t("office.link")}
        href="/office"
      >
        <div className="app-top">
          <span>Inbox</span>
          <span className="kbd">{office("brand.kbd")}</span>
        </div>
        <div className="app-body">
          <div className="app-h">
            <h4>Inbox</h4>
          </div>
          <MockTabs tabs={inbox.tabs} />
          <div className="ilist">
            {inbox.groups.map((g) => (
              <div key={g.head}>
                <div className="ihead">
                  <span>{g.head}</span>
                  <span className="code">{g.action}</span>
                </div>
                {g.items.map((it) => (
                  <div key={it.t} className="iitem">
                    <div>
                      {it.t}
                      <small>{it.s}</small>
                    </div>
                    {it.due && <span className="due">{it.due}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Row>

      <Row
        top={t("production.top")}
        name="Pantheus Production"
        desc={t("production.desc")}
        feat={t.raw("production.feat") as string[]}
        route={productionStops.slice(1).map((s) => `${s.n} ${s.short}`)}
        link={t("production.link")}
        href="/production"
      >
        <div className="app-top">
          <span>{order.crumb}</span>
          <span className="kbd">{production("brand.kbd")}</span>
        </div>
        <div className="app-body">
          <div className="app-h">
            <h4>{order.title}</h4>
            {order.chips.map((c) => (
              <Chip key={c.t} tone={c.c}>
                {c.t}
              </Chip>
            ))}
          </div>
          <MockTable
            cols={PRODUCTION_APPS.mo.cols}
            head={order.head}
            rows={order.rows}
          />
        </div>
      </Row>
    </>
  );
}

function Row({
  top,
  name,
  desc,
  feat,
  route,
  link,
  href,
  children,
}: {
  top: string;
  name: string;
  desc: string;
  feat: string[];
  route: string[];
  link: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="prod">
      <div className="flex flex-col gap-5">
        <div className="mono text-ink-soft">{top}</div>
        <h3 className="h3 text-[36px] tracking-[-0.02em]">{name}</h3>
        <p className="body">{desc}</p>
        <ul className="feat">
          {feat.map((f) => (
            <li key={f}>
              <Mark />
              {f}
            </li>
          ))}
        </ul>
        <div className="route">
          {route.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
        <Link className="lnk" href={href}>
          {link} <span className="arr">→</span>
        </Link>
      </div>
      <div className="app">
        <div className="app-main">{children}</div>
      </div>
    </div>
  );
}
