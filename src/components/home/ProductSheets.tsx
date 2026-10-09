import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/** The two product "drawing sheets" under the home hero; each opens its page. */
export default async function ProductSheets() {
  const t = await getTranslations("Home.sheets");

  return (
    <div className="sheets mt-24 max-[900px]:mt-16">
      <Link className="sheet" href="/office">
        <SheetTop label={t("office.top")} />
        <svg className="ill" viewBox="0 0 480 190" aria-hidden="true">
          <rect className="pl2" x="8" y="8" width="464" height="174" />
          <path
            className="pl"
            d="M8 86 H150 M186 86 H300 M336 86 H472 M164 8 V86 M314 8 V86"
          />
          <rect className="pf" x="46" y="30" width="78" height="34" rx="4" />
          <circle className="pl" cx="60" cy="22" r="4" />
          <circle className="pl" cx="85" cy="22" r="4" />
          <circle className="pl" cx="110" cy="22" r="4" />
          <circle className="pl" cx="60" cy="72" r="4" />
          <circle className="pl" cx="85" cy="72" r="4" />
          <circle className="pl" cx="110" cy="72" r="4" />
          <rect className="pl" x="182" y="24" width="116" height="44" />
          <path className="pl" d="M192 34 h48 M206 46 h62 M226 58 h56" />
          <path
            className="pl"
            d="M332 24 h122 M332 38 h122 M332 52 h122 M332 66 h122"
          />
          <rect className="pf" x="34" y="112" width="58" height="22" />
          <rect className="pf" x="34" y="144" width="58" height="22" />
          <rect className="pf" x="114" y="112" width="58" height="22" />
          <rect className="pf" x="114" y="144" width="58" height="22" />
          <rect className="pf" x="226" y="112" width="58" height="22" />
          <rect className="pf" x="226" y="144" width="58" height="22" />
          <circle className="pf" cx="392" cy="138" r="26" />
          <path
            className="pa draw"
            d="M62 124 C62 96 84 96 85 72 C88 50 150 50 180 46 C230 40 250 70 255 110 C258 140 330 150 366 140 C420 128 420 80 392 52"
          />
          <circle className="fill-accent-text" cx="62" cy="124" r="4" />
          <text className="ptx" x="16" y="178">
            08:30
          </text>
          <text className="ptx" x="410" y="178">
            17:30
          </text>
        </svg>
        <SheetBody name="Pantheus Office" desc={t("office.desc")} />
        <SheetFoot status={t("office.status")} route={t("office.route")} />
      </Link>

      <Link className="sheet" href="/production">
        <SheetTop label={t("production.top")} />
        <svg className="ill" viewBox="0 0 480 190" aria-hidden="true">
          <rect className="pl2" x="8" y="8" width="464" height="174" />
          <rect className="pf" x="30" y="30" width="14" height="128" />
          <rect className="pf" x="60" y="30" width="14" height="128" />
          <rect className="pf" x="90" y="30" width="14" height="128" />
          <path
            className="pl"
            d="M30 62 h14 M30 94 h14 M30 126 h14 M60 62 h14 M60 94 h14 M60 126 h14 M90 62 h14 M90 94 h14 M90 126 h14"
          />
          <path className="pl2" d="M140 104 H446 M140 132 H446" />
          <path
            className="pl"
            d="M156 104 v28 M176 104 v28 M196 104 v28 M216 104 v28 M236 104 v28 M256 104 v28 M276 104 v28 M296 104 v28 M316 104 v28 M336 104 v28 M356 104 v28 M376 104 v28 M396 104 v28 M416 104 v28 M436 104 v28"
          />
          <rect className="pl" x="168" y="52" width="32" height="30" />
          <rect className="pl" x="246" y="52" width="32" height="30" />
          <rect className="pl" x="324" y="52" width="32" height="30" />
          <rect className="pl" x="402" y="52" width="32" height="30" />
          <rect className="pf" x="186" y="110" width="40" height="16" rx="8" />
          <rect className="pf" x="276" y="110" width="40" height="16" rx="8" />
          <rect className="pf" x="366" y="110" width="40" height="16" rx="8" />
          <path className="pa draw" d="M8 168 H120 V118 H472" />
          <circle className="fill-accent-text" cx="120" cy="118" r="4" />
          <text className="ptx" x="16" y="24">
            {t("production.materials")}
          </text>
          <text className="ptx" x="350" y="160">
            {t("production.line")}
          </text>
        </svg>
        <SheetBody name="Pantheus Production" desc={t("production.desc")} />
        <SheetFoot
          status={t("production.status")}
          route={t("production.route")}
        />
      </Link>
    </div>
  );
}

function SheetTop({ label }: { label: string }) {
  return (
    <div className="sheet-top mono">
      <span>{label}</span>
      <span className="arr" aria-hidden="true">
        →
      </span>
    </div>
  );
}

function SheetBody({ name, desc }: { name: string; desc: string }) {
  return (
    <div>
      <div className="sheet-name">{name}</div>
      <p className="body mt-1.5">{desc}</p>
    </div>
  );
}

function SheetFoot({ status, route }: { status: string; route: string }) {
  return (
    <div className="sheet-foot mono">
      <span>
        <span className="acc" aria-hidden="true">
          ●
        </span>{" "}
        {status}
      </span>
      <span>{route}</span>
    </div>
  );
}
