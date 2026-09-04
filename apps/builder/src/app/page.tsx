import { LandingNavbar } from "@/components/landing/navbar";
import { LandingHero } from "@/components/landing/hero";
import { TrustStrip } from "@/components/landing/trust-strip";
import { ProblemSection } from "@/components/landing/problem";
import { AnatomySection } from "@/components/landing/anatomy";
import { AudienceSection } from "@/components/landing/audience";
import { PaymentsSection } from "@/components/landing/payments";
import { QuoteSection } from "@/components/landing/quote";
import { FinalCta } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <main id="top">
        <LandingHero />
        <TrustStrip />
        <ProblemSection />
        <AnatomySection />
        <AudienceSection />
        <PaymentsSection />
        <QuoteSection />
        <FinalCta />
      </main>
      <LandingFooter />
    </>
  );
}