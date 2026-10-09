import Eyebrow from "@/components/Eyebrow";

/** Numbered grid of small, concrete details on a paper band. */
export default function Cards({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { t: string; b: string }[];
}) {
  return (
    <section className="py-[110px] max-[900px]:py-[84px]">
      <div className="wrap">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="h2 mt-5 mb-11 max-w-[780px]">{title}</h2>
        <ol className="cards">
          {items.map((c, i) => (
            <li key={c.t}>
              <span className="mono text-ink-soft">0{i + 1}</span>
              <h3 className="h3">{c.t}</h3>
              <p className="body">{c.b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
