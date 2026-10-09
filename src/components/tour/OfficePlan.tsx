type OfficePlanLabels = Record<
  | "accounting"
  | "chat"
  | "desks"
  | "dev"
  | "docs"
  | "entrance"
  | "meeting"
  | "projects",
  string
>;

/** Office floor plan (1600×800), traced from the design. Labels come from
 * the page so the plan reads in either language. */
export default function OfficePlan({ l }: { l: OfficePlanLabels }) {
  return (
    <>
      <path className="w-wall" d="M260 760 H160 V40 H1560 V760 H340" />
      <path className="w-ln" d="M260 752 H168 V48 H1552 V752 H340" />
      <path
        className="w-wall"
        d="M168 330 H400 M440 330 H680 M720 330 H1040 M1080 330 H1380 M1420 330 H1552 M520 48 V330 M900 48 V330 M1260 48 V330"
      />
      <path
        className="w-dash"
        d="M640 380 V752 M1080 380 V752 M168 380 H1552"
      />
      <rect className="w-fn" x="230" y="130" width="230" height="100" rx="10" />
      <circle className="w-ln" cx="262" cy="114" r="9" />
      <circle className="w-ln" cx="312" cy="114" r="9" />
      <circle className="w-ln" cx="362" cy="114" r="9" />
      <circle className="w-ln" cx="412" cy="114" r="9" />
      <circle className="w-ln" cx="262" cy="246" r="9" />
      <circle className="w-ln" cx="312" cy="246" r="9" />
      <circle className="w-ln" cx="362" cy="246" r="9" />
      <circle className="w-ln" cx="412" cy="246" r="9" />
      <circle className="w-ln" cx="214" cy="180" r="9" />
      <circle className="w-ln" cx="476" cy="180" r="9" />
      <rect className="w-fn" x="172" y="120" width="8" height="120" />
      <rect className="w-ln" x="552" y="84" width="316" height="128" />
      <path
        className="w-ln"
        d="M572 106 h90 M622 126 h120 M682 146 h80 M722 166 h110 M762 186 h74"
      />
      <path className="w-ln" d="M846 100 l6 6 l-6 6 l-6 -6 Z" />
      <rect className="w-fn" x="620" y="244" width="180" height="48" />
      <rect className="w-fn" x="930" y="84" width="300" height="22" />
      <rect className="w-fn" x="930" y="128" width="300" height="22" />
      <rect className="w-fn" x="930" y="172" width="300" height="22" />
      <rect className="w-fn" x="990" y="232" width="180" height="56" rx="4" />
      <rect className="w-fn" x="1290" y="100" width="110" height="50" />
      <rect className="w-fn" x="1420" y="100" width="110" height="50" />
      <rect className="w-fn" x="1290" y="240" width="240" height="40" />
      <path className="w-ln" d="M1350 240 v40 M1410 240 v40 M1470 240 v40" />
      <rect className="w-fn" x="220" y="430" width="160" height="88" />
      <rect className="w-fn" x="420" y="430" width="160" height="88" />
      <rect className="w-fn" x="220" y="600" width="160" height="88" />
      <rect className="w-fn" x="420" y="600" width="160" height="88" />
      <path
        className="w-ln"
        d="M300 430 V518 M220 474 H380 M500 430 V518 M420 474 H580 M300 600 V688 M220 644 H380 M500 600 V688 M420 644 H580"
      />
      <circle className="w-ln" cx="260" cy="418" r="8" />
      <circle className="w-ln" cx="340" cy="418" r="8" />
      <circle className="w-ln" cx="460" cy="418" r="8" />
      <circle className="w-ln" cx="540" cy="418" r="8" />
      <circle className="w-ln" cx="260" cy="530" r="8" />
      <circle className="w-ln" cx="340" cy="530" r="8" />
      <circle className="w-ln" cx="460" cy="530" r="8" />
      <circle className="w-ln" cx="540" cy="530" r="8" />
      <circle className="w-ln" cx="260" cy="588" r="8" />
      <circle className="w-ln" cx="340" cy="588" r="8" />
      <circle className="w-ln" cx="460" cy="588" r="8" />
      <circle className="w-ln" cx="540" cy="588" r="8" />
      <circle className="w-ln" cx="260" cy="700" r="8" />
      <circle className="w-ln" cx="340" cy="700" r="8" />
      <circle className="w-ln" cx="460" cy="700" r="8" />
      <circle className="w-ln" cx="540" cy="700" r="8" />
      <rect className="w-fn" x="680" y="440" width="360" height="50" />
      <rect className="w-fn" x="680" y="600" width="360" height="50" />
      <path
        className="w-ln"
        d="M700 450 h34 M740 450 h34 M820 450 h34 M860 450 h34 M940 450 h34 M980 450 h34 M700 610 h34 M740 610 h34 M820 610 h34 M860 610 h34 M940 610 h34 M980 610 h34"
      />
      <rect className="w-ln" x="700" y="700" width="320" height="40" />
      <path
        className="w-ln"
        d="M780 700 v40 M860 700 v40 M940 700 v40 M712 712 h50 M712 726 h40 M792 712 h50 M872 712 h46 M952 712 h50 M952 726 h44"
      />
      <circle className="w-fn" cx="1180" cy="480" r="34" />
      <circle className="w-fn" cx="1360" cy="480" r="34" />
      <circle className="w-fn" cx="1180" cy="650" r="34" />
      <circle className="w-fn" cx="1360" cy="650" r="34" />
      <path className="w-ln" d="M1470 420 h64 v260 h-64" />
      <rect className="w-ln" x="1240" y="540" width="62" height="38" rx="6" />
      <path className="w-ln" d="M1256 578 l-8 12 l18 -12" />
      <text className="w-ta" x="1271" y="565" textAnchor="middle">
        λ
      </text>
      <path
        className="w-route"
        d="M300 790 V560 L420 356 V300 L345 262 L460 356 H700 V280 L700 356 L860 420 V520 L1270 560 L1060 356 V260 L1060 356 H1400 V230"
      />
      <text className="w-tx" x="186" y="74">
        {l.meeting}
      </text>
      <text className="w-tx" x="538" y="74">
        {l.projects}
      </text>
      <text className="w-tx" x="918" y="74">
        {l.docs}
      </text>
      <text className="w-tx" x="1278" y="74">
        {l.accounting}
      </text>
      <text className="w-tx" x="186" y="404">
        {l.desks}
      </text>
      <text className="w-tx" x="658" y="404">
        {l.dev}
      </text>
      <text className="w-tx" x="1098" y="404">
        {l.chat}
      </text>
      <text className="w-tx" x="268" y="786">
        {l.entrance}
      </text>
    </>
  );
}
