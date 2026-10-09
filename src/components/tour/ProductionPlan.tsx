type ProductionPlanLabels = Record<
  | "count"
  | "engineering"
  | "finished"
  | "issue"
  | "line"
  | "materials"
  | "operations"
  | "planning"
  | "qc"
  | "receiving"
  | "truck"
  | "warranty",
  string
>;

/** Factory floor plan (1600×800), traced from the design. Labels come from
 * the page so the plan reads in either language. */
export default function ProductionPlan({ l }: { l: ProductionPlanLabels }) {
  return (
    <>
      <path
        className="w-wall"
        d="M160 540 V40 H1570 V560 M1570 680 V770 H160 V660"
      />
      <path
        className="w-ln"
        d="M168 540 V48 H1562 V560 M1562 680 V762 H168 V660"
      />
      <path
        className="w-wall"
        d="M168 270 H300 M340 270 H620 M660 270 H800 M480 48 V270 M800 48 V270 M1240 48 V270 M1240 270 H1380 M1420 270 H1562"
      />
      <path
        className="w-dash"
        d="M800 270 H1240 M168 330 H1562 M410 340 V762 M780 340 V762 M1240 340 V762"
      />
      <rect className="w-fn" x="200" y="88" width="110" height="60" />
      <rect className="w-fn" x="340" y="88" width="110" height="60" />
      <rect className="w-ln" x="200" y="178" width="250" height="66" />
      <path
        className="w-ln"
        d="M222 192 V232 M222 198 H262 M222 214 H262 M222 232 H262 M262 214 V240 M262 224 H302 M262 240 H302"
      />
      <rect className="w-fn" x="262" y="192" width="18" height="10" />
      <rect className="w-fn" x="302" y="219" width="18" height="10" />
      <rect className="w-fn" x="302" y="235" width="18" height="10" />
      <rect className="w-fn" x="510" y="88" width="80" height="48" />
      <rect className="w-fn" x="610" y="88" width="80" height="48" />
      <rect className="w-fn" x="710" y="88" width="70" height="48" />
      <rect className="w-ln" x="510" y="168" width="270" height="74" />
      <path
        className="w-ln"
        d="M548 168 v74 M587 168 v74 M626 168 v74 M665 168 v74 M704 168 v74 M743 168 v74 M516 184 h60 M560 200 h90 M600 216 h70 M650 230 h100"
      />
      <rect className="w-ln" x="850" y="80" width="340" height="82" />
      <path
        className="w-ln"
        d="M866 146 L906 130 L946 138 L986 112 L1026 120 L1066 100 L1106 108 L1146 92 L1176 96"
      />
      <rect className="w-fn" x="920" y="190" width="200" height="48" rx="24" />
      <rect className="w-fn" x="1300" y="118" width="160" height="10" />
      <circle className="w-ln" cx="1334" cy="100" r="16" />
      <circle className="w-ln" cx="1428" cy="100" r="16" />
      <path
        className="w-ln"
        d="M1334 100 L1362 74 H1408 L1428 100 M1362 74 L1352 58 H1340 M1380 74 V64 H1404"
      />
      <rect className="w-ln" x="1482" y="120" width="48" height="34" />
      <rect className="w-fn" x="1270" y="200" width="250" height="22" />
      <rect className="w-fn" x="30" y="555" width="128" height="90" />
      <rect className="w-fn" x="8" y="566" width="22" height="68" rx="4" />
      <path
        className="w-ln"
        d="M48 551 h18 M104 551 h18 M48 649 h18 M104 649 h18"
      />
      <rect className="w-ln" x="168" y="560" width="26" height="80" />
      <rect className="w-fn" x="230" y="378" width="34" height="34" />
      <rect className="w-fn" x="276" y="378" width="34" height="34" />
      <rect className="w-fn" x="322" y="378" width="34" height="34" />
      <rect className="w-fn" x="230" y="424" width="34" height="34" />
      <rect className="w-fn" x="276" y="424" width="34" height="34" />
      <rect className="w-fn" x="322" y="424" width="34" height="34" />
      <rect className="w-dash" x="220" y="600" width="170" height="140" />
      <rect className="w-fn" x="440" y="380" width="34" height="360" />
      <rect className="w-fn" x="505" y="380" width="34" height="360" />
      <rect className="w-fn" x="570" y="380" width="34" height="360" />
      <rect className="w-fn" x="635" y="380" width="34" height="360" />
      <rect className="w-fn" x="700" y="380" width="34" height="360" />
      <path
        className="w-ln"
        d="M457 380 V740 M440 440 h34 M440 500 h34 M440 560 h34 M440 620 h34 M440 680 h34 M522 380 V740 M505 440 h34 M505 500 h34 M505 560 h34 M505 620 h34 M505 680 h34 M587 380 V740 M570 440 h34 M570 500 h34 M570 560 h34 M570 620 h34 M570 680 h34 M652 380 V740 M635 440 h34 M635 500 h34 M635 560 h34 M635 620 h34 M635 680 h34 M717 380 V740 M700 440 h34 M700 500 h34 M700 560 h34 M700 620 h34 M700 680 h34"
      />
      <rect className="w-fn" x="722" y="342" width="30" height="18" />
      <path className="w-ln" d="M752 346 h14 M752 356 h14" />
      <rect className="w-fn" x="800" y="378" width="90" height="56" />
      <path className="w-wall" d="M800 540 H1220 M800 590 H1220" />
      <path
        className="w-ln"
        d="M810 540 v50 M830 540 v50 M850 540 v50 M870 540 v50 M890 540 v50 M910 540 v50 M930 540 v50 M950 540 v50 M970 540 v50 M990 540 v50 M1010 540 v50 M1030 540 v50 M1050 540 v50 M1070 540 v50 M1090 540 v50 M1110 540 v50 M1130 540 v50 M1150 540 v50 M1170 540 v50 M1190 540 v50 M1210 540 v50"
      />
      <rect className="w-ln" x="920" y="460" width="50" height="50" />
      <rect className="w-ln" x="1010" y="460" width="50" height="50" />
      <rect className="w-ln" x="1100" y="460" width="50" height="50" />
      <circle className="w-ln" cx="945" cy="616" r="9" />
      <circle className="w-ln" cx="1035" cy="616" r="9" />
      <circle className="w-ln" cx="1125" cy="616" r="9" />
      <rect className="w-fn" x="850" y="553" width="64" height="24" rx="12" />
      <rect className="w-fn" x="990" y="553" width="64" height="24" rx="12" />
      <rect className="w-fn" x="1130" y="553" width="64" height="24" rx="12" />
      <path className="w-ln" d="M860 547 v36 M1000 547 v36 M1140 547 v36" />
      <rect className="w-ln" x="1150" y="660" width="70" height="60" />
      <rect className="w-fn" x="1280" y="390" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1330" y="390" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1380" y="390" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1430" y="390" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1480" y="390" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1280" y="480" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1330" y="480" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1380" y="480" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1430" y="480" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1480" y="480" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1280" y="570" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1330" y="570" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1380" y="570" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1430" y="570" width="18" height="58" rx="9" />
      <rect className="w-fn" x="1480" y="570" width="18" height="58" rx="9" />
      <path
        className="w-ln"
        d="M1274 398 h30 M1324 398 h30 M1374 398 h30 M1424 398 h30 M1474 398 h30 M1274 488 h30 M1324 488 h30 M1374 488 h30 M1424 488 h30 M1474 488 h30 M1274 578 h30 M1324 578 h30 M1374 578 h30 M1424 578 h30 M1474 578 h30"
      />
      <rect className="w-ln" x="1496" y="680" width="44" height="22" />
      <path
        className="w-ln"
        d="M1501 684 v14 M1505 684 v14 M1510 684 v14 M1513 684 v14 M1518 684 v14 M1523 684 v14 M1527 684 v14 M1531 684 v14 M1535 684 v14"
      />
      <path
        className="w-route"
        d="M20 600 H300 V355 H790 V565 H1230 L1300 650 H1600"
      />
      <text className="w-tx" x="184" y="72">
        {l.engineering}
      </text>
      <text className="w-tx" x="496" y="72">
        {l.planning}
      </text>
      <text className="w-tx" x="816" y="72">
        {l.operations}
      </text>
      <text className="w-tx" x="1256" y="72">
        {l.warranty}
      </text>
      <text className="w-tx" x="184" y="364">
        {l.receiving}
      </text>
      <text className="w-tx" x="426" y="364">
        {l.materials}
      </text>
      <text className="w-tx" x="900" y="364">
        {l.line}
      </text>
      <text className="w-tx" x="1256" y="364">
        {l.finished}
      </text>
      <text className="w-ta" x="812" y="412">
        {l.issue}
      </text>
      <text className="w-ta" x="1160" y="694">
        {l.qc}
      </text>
      <text className="w-ta" x="244" y="676">
        {l.count}
      </text>
      <text className="w-ta" x="20" y="540">
        {l.truck}
      </text>
    </>
  );
}
