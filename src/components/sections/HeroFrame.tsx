import Nav from "@/components/sections/Nav";

/** Dark opening band shared by every page: drafting grid, slow aura, nav. */
export default function HeroFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`dark relative overflow-hidden bg-paper text-ink ${className}`}
    >
      <div className="gridbg" aria-hidden="true" />
      <div className="aura" aria-hidden="true" />
      <Nav />
      {children}
    </section>
  );
}
