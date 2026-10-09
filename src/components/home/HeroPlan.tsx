import { getTranslations } from "next-intl/server";
import OfficePlan from "@/components/tour/OfficePlan";
import ProductionPlan from "@/components/tour/ProductionPlan";

/**
 * The floor under the home hero: the office and the factory drawn as one
 * plan, tilted away like a drawing laid on the table. The dashed route links
 * the office's last stop (a purchase request) to the factory's receiving dock.
 */
export default async function HeroPlan() {
  const office = await getTranslations("Office");
  const production = await getTranslations("Production");

  return (
    <div className="hero-plan" aria-hidden="true">
      <svg className="hero-plane" viewBox="120 0 3080 800">
        <OfficePlan l={office.raw("plan")} />
        <path className="w-route" d="M1400 230 H1510 V600 H1620" />
        <g transform="translate(1600 0)">
          <ProductionPlan l={production.raw("plan")} />
        </g>
      </svg>
    </div>
  );
}
