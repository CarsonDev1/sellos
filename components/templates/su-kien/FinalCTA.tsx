'use client';

import { motion } from 'framer-motion';
import { Ticket, Clock } from 'lucide-react';

export default function FinalCTA() {
	return (
		<section className='relative py-28 px-4 overflow-hidden bg-slate-950'>
			<div
				aria-hidden
				className='absolute inset-0 opacity-90'
				style={{
					background:
						'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(244,114,182,0.4), transparent 60%), radial-gradient(ellipse 60% 60% at 30% 100%, rgba(251,191,36,0.3), transparent 60%), radial-gradient(ellipse 60% 60% at 70% 100%, rgba(168,85,247,0.35), transparent 60%)',
				}}
			/>
			<div
				aria-hidden
				className='absolute inset-0 opacity-[0.06]'
				style={{
					backgroundImage:
						'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
					backgroundSize: '48px 48px',
				}}
			/>

			<motion.div
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className='relative container mx-auto max-w-3xl text-center text-white'
			>
				<div className='inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-semibold text-amber-300 uppercase tracking-[0.15em] mb-7'>
					<Clock className='w-3.5 h-3.5' />
					Còn 47 chỗ — đóng đăng ký 28/02
				</div>

				<h2
					className='font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6'
					style={{ lineHeight: '1.15' }}
				>
					Đặt vé hôm nay —{' '}
					<span className='bg-gradient-to-r from-amber-300 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent'>
						gặp nhau ở GEM Center
					</span>
				</h2>

				<p className='text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto'>
					1 ngày có thể thay đổi cách bạn vận hành công ty mãi mãi. Đặt vé sớm để nhận giá tốt và chỗ ngồi đẹp.
				</p>

				<div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
					<a
						href='#tickets'
						className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-900 font-bold px-10 h-14 rounded-xl shadow-2xl shadow-rose-500/30 transition-all'
					>
						<Ticket className='w-5 h-5' />
						Mua vé ngay
					</a>
				</div>

				<p className='text-white/50 text-sm mt-6'>
					Đặt nhóm 5+ người được giảm thêm 15% · Liên hệ ban tổ chức
				</p>
			</motion.div>
		</section>
	);
}
