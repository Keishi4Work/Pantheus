import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ProductMark from "@/components/marks/ProductMark";
import { PRODUCT_NAMES } from "@/components/marks/product-marks";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="dark border-t border-line bg-paper pt-14 pb-10 text-ink">
      <div className="wrap">
        <div className="foot-cols">
          <div className="flex flex-col gap-3.5">
            <span className="mono acc">Pantheus</span>
            <p className="body">{t("tagline")}</p>
            <span className="mono text-ink-soft">{t("motto")}</span>
          </div>
          <nav aria-label={t("products")}>
            <div className="mono mb-2 text-ink-soft">{t("products")}</div>
            <Link href="/office">
              <ProductMark product="office" size={16} />
              Office
            </Link>
            <Link href="/production">
              <ProductMark product="production" size={16} />
              Production
            </Link>
            {(["accounting", "crm"] as const).map((p) => (
              <span key={p} className="foot-soon">
                <ProductMark product={p} size={16} />
                {PRODUCT_NAMES[p]} · {t("soon")}
              </span>
            ))}
          </nav>
          <nav aria-label={t("company")}>
            <div className="mono mb-2 text-ink-soft">{t("company")}</div>
            <Link href={{ pathname: "/", hash: "approach" }}>
              {t("approach")}
            </Link>
            <a href="#contact">{t("contact")}</a>
          </nav>
        </div>
        <div className="mono mt-12 border-t border-line pt-5 text-ink-soft">
          © 2026 Pantheus
        </div>
      </div>
    </footer>
  );
}
