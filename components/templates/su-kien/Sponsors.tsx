'use client';

import { motion } from 'framer-motion';

const PLATINUM = ['VinaCapital', 'MoMo'];
const GOLD = ['Tiki', 'Highlands Coffee', 'Coolmate', 'Be Group', 'NovaTech', 'ShopeeFood'];

export default function Sponsors() {
	return (
		<section className='py-20 px-4 bg-white border-y border-slate-100'>
			<div className='container mx-auto max-w-6xl'>
				<motion.p
					initial={{ opacity: 0, y: 8 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className='text-center text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] mb-3'
				>
					Đồng hành cùng chúng tôi
				</motion.p>
				<motion.h2
					initial={{ opacity: 0, y: 8 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4, delay: 0.05 }}
					className='font-heading text-2xl font-bold text-slate-900 text-center mb-12'
				>
					Nhà tài trợ Vietnam Summit 2026
				</motion.h2>

				{/* Platinum */}
				<div className='mb-10'>
					<p className='text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] text-center mb-5'>
						Platinum sponsors
					</p>
					<div className='flex flex-wrap items-center justify-center gap-x-12 gap-y-6'>
						{PLATINUM.map((s, i) => (
							<motion.span
								key={i}
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: i * 0.05 }}
								className='font-heading font-bold text-slate-700 text-3xl tracking-tight'
								style={{ letterSpacing: '-0.02em' }}
							>
								{s}
							</motion.span>
						))}
					</div>
				</div>

				{/* Gold */}
				<div>
					<p className='text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] text-center mb-5'>
						Gold sponsors
					</p>
					<div className='flex flex-wrap items-center justify-center gap-x-10 gap-y-4'>
						{GOLD.map((s, i) => (
							<motion.span
								key={i}
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: i * 0.04 }}
								className='font-heading font-bold text-slate-300 text-xl tracking-tight hover:text-slate-500 transition-colors'
							>
								{s}
							</motion.span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
