import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import HowItWorks from "@/components/HowItWorks";
import WhatYouGet from "@/components/WhatYouGet";
import TemplatePlatform from "@/components/TemplatePlatform";
import Roadmap from "@/components/Roadmap";
import WhatsInPlatform from "@/components/WhatsInPlatform";
import SocialProof from "@/components/SocialProof";
import WhoItsFor from "@/components/WhoItsFor";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <WhatYouGet />
      <TemplatePlatform />
      <Roadmap />
      <WhatsInPlatform />
      <SocialProof />
      <WhoItsFor />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Separator className="bg-slate-100" />
      <Footer />
    </main>
  );
}
