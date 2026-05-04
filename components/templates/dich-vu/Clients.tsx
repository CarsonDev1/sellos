'use client';

import { motion } from 'framer-motion';

const CLIENTS = [
	'Vinamilk',
	'Highlands',
	'Tiki',
	'MoMo',
	'VNG',
	'Saigontourist',
	'Be',
	'Sendo',
];

export default function Clients() {
	return (
		<section className='py-16 px-4 border-y border-slate-200 bg-slate-50/60'>
			<div className='container mx-auto max-w-6xl'>
				<motion.p
					initial={{ opacity: 0, y: 8 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className='text-slate-400 text-xs font-semibold tracking-[0.2em] uppercase text-center mb-8'
				>
					Đã đồng hành cùng các thương hiệu hàng đầu
				</motion.p>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className='flex flex-wrap items-center justify-center gap-x-12 gap-y-6'
				>
					{CLIENTS.map((c, i) => (
						<span
							key={i}
							className='font-heading font-bold text-slate-300 text-xl sm:text-2xl tracking-tight hover:text-slate-500 transition-colors'
							style={{ letterSpacing: '-0.02em' }}
						>
							{c}
						</span>
					))}
				</motion.div>
			</div>
		</section>
	);
}
