import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Chip, MockTable, MockTabs } from "@/components/tour/mock";
import { PRODUCTION_APPS } from "@/components/tour/production";
import type { MockApp } from "@/components/tour/stops";

type Inbox = {
  tabs: string[];
  groups: {
    head: string;
    action: string;
    items: { t: string; s: string; due?: string }[];
  }[];
};

/**
 * The home page's product overview: one sheet per product, each a glimpse of
 * a real screen that opens the product's page, then a line for work outside
 * them. The production order screen comes from the product page's own copy,
 * so the two never drift apart.
 */
export default async function ProductSheets() {
  const t = await getTranslations("Home.products");
  const production = await getTranslations("Production");

  const inbox = t.raw("office.inbox") as Inbox;
  const order = production.raw("apps.mo") as Omit<MockApp, "cols" | "bar">;

  return (
    <>
      <div className="sheets">
        <Sheet
          href="/office"
          top={t("office.top")}
          status={t("office.status")}
          name="Pantheus Office"
          desc={t("office.desc")}
          link={t("office.link")}
        >
          <div className="app-top">Inbox</div>
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
        </Sheet>

        <Sheet
          href="/production"
          top={t("production.top")}
          status={t("production.status")}
          name="Pantheus Production"
          desc={t("production.desc")}
          link={t("production.link")}
        >
          <div className="app-top">{order.crumb}</div>
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
        </Sheet>
      </div>

      <div className="sheets-more">
        <p className="body">{t("more.text")}</p>
        <a className="lnk" href="#contact">
          {t("more.link")} <span className="arr">→</span>
        </a>
      </div>
    </>
  );
}

function Sheet({
  href,
  top,
  status,
  name,
  desc,
  link,
  children,
}: {
  href: string;
  top: string;
  status: string;
  name: string;
  desc: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="sheet" href={href}>
      <div className="sheet-top mono">
        <span>{top}</span>
        <span>
          <span className="acc" aria-hidden="true">
            ●
          </span>{" "}
          {status}
        </span>
      </div>
      <div className="sheet-shot" aria-hidden="true">
        <div className="app">
          <div className="app-main">{children}</div>
        </div>
      </div>
      <div>
        <h3 className="sheet-name">{name}</h3>
        <p className="body mt-1.5">{desc}</p>
      </div>
      <span className="sheet-go">
        {link} <span className="arr">→</span>
      </span>
    </Link>
  );
}
