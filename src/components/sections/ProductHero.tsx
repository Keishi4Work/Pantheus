import Eyebrow from "@/components/Eyebrow";
import HeroFrame from "@/components/sections/HeroFrame";

/** Opening band of a product page: claim, two actions, and four key facts. */
export default function ProductHero({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  facts,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  primary: string;
  secondary: string;
  facts: { k: string; v: string }[];
}) {
  return (
    <HeroFrame className="pb-20">
      <div className="wrap pt-[104px] max-[900px]:pt-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="h1 h1-sm mt-[26px] max-w-[980px]">{title}</h1>
        <p className="lead mt-[26px] max-w-[660px]">{lead}</p>
        <div className="mt-[34px] flex flex-wrap gap-3">
          <a className="btn btn-solid" href="#contact">
            {primary} <span className="arr">→</span>
          </a>
          <a className="btn" href="#journey">
            {secondary} <span className="arr">↓</span>
          </a>
        </div>
        <dl className="facts">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="mono text-ink-soft">{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </HeroFrame>
  );
}
