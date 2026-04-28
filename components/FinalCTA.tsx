'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FinalCTA() {
	return (
		<section
			id='final-cta'
			className='py-28 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 relative overflow-hidden'
		>
			{/* Subtle pattern */}
			<div
				className='absolute inset-0 opacity-10 pointer-events-none'
				style={{
					backgroundImage:
						'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
					backgroundSize: '40px 40px',
				}}
			/>

			<div className='relative container mx-auto max-w-3xl text-center'>
				<motion.div
					initial={{ opacity: 0, y: 32 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='space-y-6'
				>
					{/* Headline */}
					<h2
						className='font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white'
						style={{ lineHeight: '1.55' }}
					>
						Bắt Đầu Hôm Nay — Hệ Thống Của Bạn Có Thể Chạy Trong{' '}
						<span className='inline-block bg-white/20 border border-white/30 px-3 py-1 rounded-xl backdrop-blur-sm'>
							7 Ngày Tới
						</span>
					</h2>

					{/* Slot */}
					<p className='text-blue-200 text-base'>
						Còn <span className='text-white font-bold text-xl'>12</span> slot tháng này
					</p>

					{/* CTA */}
					<div className='flex flex-col items-center gap-4'>
						<Button
							asChild
							size='lg'
							className='bg-white hover:bg-blue-50 text-blue-700 font-bold text-lg px-12 h-14 shadow-xl shadow-blue-900/30'
						>
							<Link href='#pricing'>🚀 Bắt Đầu Miễn Phí</Link>
						</Button>

						<p className='text-blue-200 text-sm'>
							<span className='text-white font-medium'>✓ Hoàn tiền 100%</span>
							{' · '}
							Không hỏi lý do
						</p>
					</div>

					{/* Trust badges */}
					<div className='flex flex-wrap items-center justify-center gap-6 pt-4'>
						{['200+ hệ thống đã ra mắt', 'Xây trong 7 ngày', 'AI tích hợp sẵn'].map((badge, i) => (
							<div key={i} className='flex items-center gap-2 text-blue-200 text-sm'>
								<span className='text-white'>✓</span>
								{badge}
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
