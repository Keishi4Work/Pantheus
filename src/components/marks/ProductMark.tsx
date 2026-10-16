/**
 * Product marks — one per Pantheus product (Production, Office, Accounting, CRM).
 * Each keeps the λ of `Mark` and adds exactly one variant of the ≡ bars
 * (Pantheus UI DESIGN_SYSTEM §9.1, brand/BRAND-PRODUCTS.md §2). `ProductMark`
 * is transcribed from the canon; geometry lives in product-marks.ts, generated
 * by the canon's build_brand.py — never hand-edit the paths.
 *
 *   <ProductMark product="accounting" size={20} />
 */
import {
  MARK_STROKE,
  PRODUCT_MARKS,
  PRODUCT_NAMES,
  type ProductKey,
} from "./product-marks";

export type { ProductKey };

type Props = {
  product: ProductKey;
  size?: number;
  title?: string; // leave empty when the product name sits next to the mark (avoids a double read)
  className?: string;
};

export default function ProductMark({
  product,
  size = 20,
  title,
  className,
}: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={MARK_STROKE}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className}
    >
      <path d={PRODUCT_MARKS[product]} />
    </svg>
  );
}

/**
 * Compact lockup: mark + product name, the canon's form wherever several
 * products stand side by side. Canon ratios: gap 0.42 × mark, name Manrope 600
 * at 0.72 × mark, tracking −0.01em. The canon's version sets
 * `fontFamily: "Manrope"` inline, which misses next/font's hashed family, so
 * this one takes the font from `font-sans` and the colour from its parent.
 * Never place the PANTHEUS wordmark next to it.
 */
export function ProductLockup({
  product,
  size = 20,
  className = "",
}: {
  product: ProductKey;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center font-sans leading-none font-semibold tracking-[-0.01em] ${className}`}
      style={{ gap: Math.round(size * 0.42), fontSize: size * 0.72 }}
    >
      <ProductMark product={product} size={size} className="shrink-0" />
      {PRODUCT_NAMES[product]}
    </span>
  );
}
