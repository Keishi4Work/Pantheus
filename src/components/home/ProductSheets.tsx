import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Chip, MockTable, MockTabs } from "@/components/tour/mock";
import { PRODUCTION_APPS } from "@/components/tour/production";
import type { MockApp } from "@/components/tour/stops";
import { ProductLockup, type ProductKey } from "@/components/marks/ProductMark";

type Inbox = {
  tabs: string[];
  groups: {
    head: string;
    action: string;
    items: { t: string; s: string; due?: string }[];
  }[];
};

/**
 * The home page's product overview. Released products get a sheet with a
 * glimpse of a real screen that opens the product's page; products still to
 * come get a quieter card with no link. Every product is introduced by its
 * compact lockup (mark + name), never by the wordmark. The production order
 * screen comes from the product page's own copy, so the two never drift apart.
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
          product="office"
          status={t("office.status")}
          tagline={t("office.tagline")}
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
          product="production"
          status={t("production.status")}
          tagline={t("production.tagline")}
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

      <div className="soon">
        {(["accounting", "crm"] as const).map((p) => (
          <div key={p}>
            <div className="sheet-top">
              <ProductLockup product={p} size={22} />
              <span className="badge">{t("soon")}</span>
            </div>
            <div>
              <h3 className="soon-name">{t(`${p}.tagline`)}</h3>
              <p className="body mt-1">{t(`${p}.desc`)}</p>
            </div>
          </div>
        ))}
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
  product,
  status,
  tagline,
  desc,
  link,
  children,
}: {
  href: string;
  product: ProductKey;
  status: string;
  tagline: string;
  desc: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="sheet" href={href}>
      <div className="sheet-top">
        <ProductLockup product={product} size={22} />
        <span className="badge badge-info">{status}</span>
      </div>
      <div className="sheet-shot" aria-hidden="true">
        <div className="app">
          <div className="app-main">{children}</div>
        </div>
      </div>
      <div>
        <h3 className="sheet-name">{tagline}</h3>
        <p className="body mt-1.5">{desc}</p>
      </div>
      <span className="sheet-go">
        {link} <span className="arr">→</span>
      </span>
    </Link>
  );
}
