'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

export default function FinalCTA() {
	return (
		<section
			id='final-cta'
			className='py-28 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 relative overflow-hidden'
		>
			{/* Glow */}
			<div
				aria-hidden
				className='absolute inset-0 pointer-events-none'
				style={{
					background:
						'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.25), transparent 70%)',
				}}
			/>
			<div
				aria-hidden
				className='absolute inset-0 opacity-[0.04] pointer-events-none'
				style={{
					backgroundImage:
						'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
					backgroundSize: '48px 48px',
				}}
			/>

			<div className='relative container mx-auto max-w-3xl text-center'>
				<motion.div
					initial={{ opacity: 0, y: 32 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='space-y-7'
				>
					<span className='inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold text-blue-200 uppercase tracking-wider'>
						<span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
						Còn 12 chỗ tháng này
					</span>

					<h2
						className='font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white'
						style={{ lineHeight: '1.2' }}
					>
						Bắt đầu hôm nay —<br className='hidden sm:block' />
						<span className='inline-block bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent'>
							website của bạn có thể chạy trong tuần tới
						</span>
					</h2>

					<p className='text-blue-100/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed'>
						Bạn không cần biết code. Không cần thuê dev. Không cần cài đặt phần mềm.
						Chỉ cần thông tin về sản phẩm của mình.
					</p>

					<div className='flex flex-col items-center gap-4 pt-2'>
						<Button
							asChild
							size='lg'
							className='bg-white hover:bg-blue-50 text-blue-700 font-bold text-lg px-10 h-14 shadow-2xl shadow-blue-900/50'
						>
							<Link href='#pricing' className='flex items-center gap-2'>
								Bắt đầu miễn phí
								<ArrowRight className='w-5 h-5' />
							</Link>
						</Button>
					</div>

					<div className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-3 text-sm text-blue-200/80'>
						{[
							'Hơn 200 chủ shop đã dùng',
							'Có người kèm khi cần',
							'Hoàn tiền nếu không dùng được',
						].map((badge, i) => (
							<div key={i} className='flex items-center gap-1.5'>
								<Check className='w-4 h-4 text-green-400' strokeWidth={3} />
								{badge}
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
