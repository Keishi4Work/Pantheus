import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Pillars from "@/components/sections/Pillars";
import Process from "@/components/sections/Process";
import Audience from "@/components/sections/Audience";
import Closing from "@/components/sections/Closing";
import Footer from "@/components/sections/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Pillars />
        <Process />
        <Audience />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
