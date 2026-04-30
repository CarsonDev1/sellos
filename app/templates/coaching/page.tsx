import CoachNavbar from "@/components/templates/coaching/CoachNavbar";
import CoachHero from "@/components/templates/coaching/CoachHero";
import CoachLogos from "@/components/templates/coaching/CoachLogos";
import CoachAbout from "@/components/templates/coaching/CoachAbout";
import CoachServices from "@/components/templates/coaching/CoachServices";
import HowItWorks from "@/components/templates/coaching/HowItWorks";
import CoachResults from "@/components/templates/coaching/CoachResults";
import CoachPricing from "@/components/templates/coaching/CoachPricing";
import CoachFAQ from "@/components/templates/coaching/CoachFAQ";
import CoachCTA from "@/components/templates/coaching/CoachCTA";
import CoachFooter from "@/components/templates/coaching/CoachFooter";

export const metadata = {
  title: "KHOAcoach — Business Coach #1 Vietnam",
  description: "Coaching 1-1 giúp doanh nhân Việt tăng doanh thu, xây hệ thống, và đột phá trong 6 tháng. 300+ clients. Cam kết hoàn tiền.",
};

export default function CoachingPage() {
  return (
    <main className="min-h-screen bg-white">
      <CoachNavbar />
      <CoachHero />
      <CoachLogos />
      <CoachAbout />
      <CoachServices />
      <HowItWorks />
      <CoachResults />
      <CoachPricing />
      <CoachFAQ />
      <CoachCTA />
      <CoachFooter />
    </main>
  );
}
