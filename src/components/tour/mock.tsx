/**
 * Pieces of the illustrative app screens. Table cells are plain strings with
 * an optional prefix that picks the style — `ok:` `warn:` `bad:` `info:`
 * `mute:` render a status chip, `code:` `num:` `neg:` a mono value. A header
 * starting with `r:` right-aligns its column; a tab starting with `*` is the
 * active one. Keeping the data as strings lets it live in the message files.
 */

export type Tone = "ok" | "warn" | "bad" | "info" | "mute";

export function Chip({ tone, children }: { tone: Tone; children: string }) {
  return <span className={`chip c-${tone}`}>{children}</span>;
}

function Cell({ value }: { value: string }) {
  const m = /^(ok|warn|bad|info|mute|code|num|neg):(.*)$/.exec(value);
  if (!m) return <>{value}</>;
  const [, kind, text] = m;
  if (kind === "code") return <span className="code">{text}</span>;
  if (kind === "num") return <span className="num">{text}</span>;
  if (kind === "neg") return <span className="num neg">{text}</span>;
  return <Chip tone={kind as Tone}>{text}</Chip>;
}

export function MockTable({
  cols,
  head,
  rows,
}: {
  cols: string;
  head: string[];
  rows: string[][];
}) {
  const right = head.map((h) => h.startsWith("r:"));
  const td = (i: number) => (right[i] ? "td r" : "td");
  return (
    <div className="tbl">
      <div className="tr th" style={{ gridTemplateColumns: cols }}>
        {head.map((h, i) => (
          <div key={i} className={td(i)}>
            {right[i] ? h.slice(2) : h}
          </div>
        ))}
      </div>
      {rows.map((row, r) => (
        <div key={r} className="tr" style={{ gridTemplateColumns: cols }}>
          {row.map((v, i) => (
            <div key={i} className={td(i)}>
              <Cell value={v} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function MockTabs({ tabs }: { tabs: string[] }) {
  return (
    <div className="app-tabs">
      {tabs.map((t) =>
        t.startsWith("*") ? (
          <span key={t} className="on">
            {t.slice(1)}
          </span>
        ) : (
          <span key={t}>{t}</span>
        ),
      )}
    </div>
  );
}
