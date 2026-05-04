import Navbar from '@/components/templates/su-kien/Navbar';
import Hero from '@/components/templates/su-kien/Hero';
import About from '@/components/templates/su-kien/About';
import Speakers from '@/components/templates/su-kien/Speakers';
import Agenda from '@/components/templates/su-kien/Agenda';
import Tickets from '@/components/templates/su-kien/Tickets';
import Venue from '@/components/templates/su-kien/Venue';
import Sponsors from '@/components/templates/su-kien/Sponsors';
import PastAttendees from '@/components/templates/su-kien/PastAttendees';
import FinalCTA from '@/components/templates/su-kien/FinalCTA';
import Footer from '@/components/templates/su-kien/Footer';

export const metadata = {
	title: 'Vietnam Summit 2026 — Hội Nghị Lớn Nhất Ngành',
	description:
		'Hội nghị thường niên dành cho cộng đồng startup, e-commerce và marketers Việt Nam. 1.500+ khách, 25 diễn giả, 1 ngày tại GEM Center TP.HCM. 15/03/2026.',
};

export default function SuKienPage() {
	return (
		<main className='min-h-screen bg-slate-950'>
			<Navbar />
			<Hero />
			<About />
			<Speakers />
			<Agenda />
			<Tickets />
			<Venue />
			<Sponsors />
			<PastAttendees />
			<FinalCTA />
			<Footer />
		</main>
	);
}
