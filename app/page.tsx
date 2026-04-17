import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/landing/hero";
import { ThreeStep } from "@/components/landing/three-step";
import { WhoWeHelp } from "@/components/landing/who-we-help";
import { FeaturedStrip } from "@/components/landing/featured-strip";
import { HowWeMatch } from "@/components/landing/how-we-match";
import { Testimonials } from "@/components/landing/testimonials";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ThreeStep />
        <WhoWeHelp />
        <FeaturedStrip />
        <HowWeMatch />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
