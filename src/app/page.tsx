import SiteHeader from "@/components/marketing/SiteHeader";
import Hero from "@/components/marketing/Hero";
import WhatYouGet from "@/components/marketing/WhatYouGet";
import TrustStrip from "@/components/marketing/TrustStrip";
import Features from "@/components/marketing/Features";
import HowItWorks from "@/components/marketing/HowItWorks";
import Showcase from "@/components/marketing/Showcase";
import Pricing from "@/components/marketing/Pricing";
import Testimonials from "@/components/marketing/Testimonials";
import Faq from "@/components/marketing/Faq";
import DemoForm from "@/components/marketing/DemoForm";
import CtaBand from "@/components/marketing/CtaBand";
import SiteFooter from "@/components/marketing/SiteFooter";
import JsonLd from "@/components/marketing/JsonLd";
import ScrollProgress from "@/components/marketing/ScrollProgress";

export default function LandingPage() {
  return (
    <>
      <JsonLd />
      <SiteHeader />
      <main>
        <Hero />
        <WhatYouGet />
        <TrustStrip />
        <Features />
        <HowItWorks />
        <Showcase />
        <Pricing />
        <Testimonials />
        <Faq />
        <DemoForm />
        <CtaBand />
      </main>
      <SiteFooter />
      <ScrollProgress />
    </>
  );
}
