import { Link } from "@/i18n/navigation";

type Action = { label: string; href: string };

/** The `#contact` band that closes every page. */
export default function Closing({
  heading,
  lead,
  primary,
  secondary,
}: {
  heading: string;
  lead: string;
  primary: Action;
  secondary: Action;
}) {
  return (
    <section
      id="contact"
      className="dark relative overflow-hidden border-t border-line bg-paper py-[120px] text-ink max-[900px]:py-[88px]"
    >
      <div className="gridbg" aria-hidden="true" />
      <div className="wrap">
        <h2 className="h1 h1-close max-w-[840px]">{heading}</h2>
        <p className="lead mt-[22px] max-w-[580px]">{lead}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ActionLink action={primary} className="btn btn-solid">
            {primary.label} <span className="arr">→</span>
          </ActionLink>
          <ActionLink action={secondary} className="btn">
            {secondary.label}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}

function ActionLink({
  action,
  className,
  children,
}: {
  action: Action;
  className: string;
  children: React.ReactNode;
}) {
  // In-page anchors stay plain; page links go through the locale-aware Link.
  return action.href.startsWith("#") ? (
    <a href={action.href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={action.href} className={className}>
      {children}
    </Link>
  );
}
