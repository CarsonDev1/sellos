import Navbar from '@/components/templates/dich-vu/Navbar';
import Hero from '@/components/templates/dich-vu/Hero';
import Clients from '@/components/templates/dich-vu/Clients';
import Services from '@/components/templates/dich-vu/Services';
import Process from '@/components/templates/dich-vu/Process';
import CaseStudies from '@/components/templates/dich-vu/CaseStudies';
import WhyUs from '@/components/templates/dich-vu/WhyUs';
import Team from '@/components/templates/dich-vu/Team';
import Testimonials from '@/components/templates/dich-vu/Testimonials';
import FAQ from '@/components/templates/dich-vu/FAQ';
import Contact from '@/components/templates/dich-vu/Contact';
import Footer from '@/components/templates/dich-vu/Footer';

export const metadata = {
	title: 'ApexStudio — Agency Chiến Lược & Thực Thi',
	description:
		'Agency chiến lược + thực thi cho doanh nghiệp Việt. Tư vấn → Triển khai → Đo lường, minh bạch ở mỗi bước. 150+ dự án, ROI trung bình 3.2x.',
};

export default function DichVuPage() {
	return (
		<main className='min-h-screen bg-white'>
			<Navbar />
			<Hero />
			<Clients />
			<Services />
			<Process />
			<CaseStudies />
			<WhyUs />
			<Team />
			<Testimonials />
			<FAQ />
			<Contact />
			<Footer />
		</main>
	);
}
