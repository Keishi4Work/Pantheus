import HeroFrame from "@/components/sections/HeroFrame";
import { ProductLockup, type ProductKey } from "@/components/marks/ProductMark";

/**
 * Opening band of a product page: the product's lockup and descriptor, then
 * claim, two actions, and four key facts. The lockup name stays English; the
 * descriptor carries the local wording (canon NAMING-CONTENT §1).
 */
export default function ProductHero({
  product,
  descriptor,
  title,
  lead,
  primary,
  secondary,
  facts,
}: {
  product: ProductKey;
  descriptor: string;
  title: React.ReactNode;
  lead: string;
  primary: string;
  secondary: string;
  facts: { k: string; v: string }[];
}) {
  return (
    <HeroFrame className="pb-20">
      <div className="wrap pt-[104px] max-[900px]:pt-20">
        <div className="phero-id">
          <ProductLockup product={product} size={28} />
          <span className="label">{descriptor}</span>
        </div>
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
