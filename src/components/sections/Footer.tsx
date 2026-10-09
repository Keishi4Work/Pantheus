import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

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
            <Link href="/office">Pantheus Office</Link>
            <Link href="/production">Pantheus Production</Link>
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
