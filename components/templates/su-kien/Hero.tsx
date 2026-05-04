'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, Ticket } from 'lucide-react';

const HERO_BG =
	'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=2000&q=80';

const EVENT_DATE = new Date('2026-03-15T09:00:00+07:00');

function useCountdown() {
	const [now, setNow] = useState<number>(() => Date.now());
	useEffect(() => {
		const t = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(t);
	}, []);
	const diff = Math.max(0, EVENT_DATE.getTime() - now);
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const mins = Math.floor((diff / (1000 * 60)) % 60);
	const secs = Math.floor((diff / 1000) % 60);
	return { days, hours, mins, secs };
}

export default function Hero() {
	const { days, hours, mins, secs } = useCountdown();
	return (
		<section className='relative pt-32 pb-24 lg:pb-28 overflow-hidden bg-slate-950 text-white'>
			{/* Background photo */}
			<div className='absolute inset-0 -z-20'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={HERO_BG}
					alt=''
					className='w-full h-full object-cover'
				/>
				<div
					aria-hidden
					className='absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950'
				/>
			</div>
			<div
				aria-hidden
				className='absolute inset-0 -z-10'
				style={{
					background:
						'radial-gradient(ellipse 60% 60% at 20% 0%, rgba(244,114,182,0.4), transparent 60%), radial-gradient(ellipse 60% 60% at 80% 30%, rgba(251,191,36,0.3), transparent 60%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(168,85,247,0.35), transparent 70%)',
				}}
			/>

			<div className='container mx-auto max-w-6xl px-4 relative'>
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center max-w-3xl mx-auto'
				>
					<div className='inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-semibold text-white/90 uppercase tracking-[0.15em] mb-7'>
						<span className='w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse' />
						Đăng ký sớm — giảm 30% hết 28/02
					</div>

					<h1
						className='font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6'
						style={{ lineHeight: '1.05' }}
					>
						<span className='block'>Vietnam</span>
						<span className='block bg-gradient-to-r from-amber-300 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent'>
							Summit 2026
						</span>
					</h1>

					<p className='text-white/85 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10'>
						Hội nghị thường niên lớn nhất ngành công nghệ &amp; thương mại điện tử Việt Nam.
						<br className='hidden sm:block' />
						<strong className='text-white'>1 ngày, 25 diễn giả, 1.500+ người tham dự.</strong>
					</p>

					{/* Event meta */}
					<div className='flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10 text-white/85 text-sm'>
						<div className='inline-flex items-center gap-2'>
							<Calendar className='w-4 h-4 text-amber-300' />
							Thứ 7, 15/03/2026
						</div>
						<span className='hidden sm:inline text-white/30'>·</span>
						<div className='inline-flex items-center gap-2'>
							<Clock className='w-4 h-4 text-amber-300' />
							8:30 - 17:30
						</div>
						<span className='hidden sm:inline text-white/30'>·</span>
						<div className='inline-flex items-center gap-2'>
							<MapPin className='w-4 h-4 text-amber-300' />
							GEM Center, Q.1, TP.HCM
						</div>
					</div>

					{/* Countdown */}
					<div className='inline-flex bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-10'>
						{[
							{ value: days, label: 'Ngày' },
							{ value: hours, label: 'Giờ' },
							{ value: mins, label: 'Phút' },
							{ value: secs, label: 'Giây' },
						].map((c, i, arr) => (
							<div key={c.label} className='flex'>
								<div className='px-4 sm:px-6 text-center min-w-[60px]'>
									<p className='font-heading font-bold text-3xl sm:text-4xl text-white tabular-nums'>
										{String(c.value).padStart(2, '0')}
									</p>
									<p className='text-[10px] text-white/60 uppercase tracking-widest mt-1'>
										{c.label}
									</p>
								</div>
								{i < arr.length - 1 && <div className='w-px bg-white/10 my-2' />}
							</div>
						))}
					</div>

					<div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
						<a
							href='#tickets'
							className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-900 font-bold px-8 h-12 rounded-xl shadow-lg shadow-rose-500/30 transition-all'
						>
							<Ticket className='w-4 h-4' />
							Mua vé ngay
						</a>
						<a
							href='#agenda'
							className='inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold px-7 h-12 rounded-xl transition-all'
						>
							Xem lịch trình
							<ArrowRight className='w-4 h-4' />
						</a>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
