'use client';

import { motion } from 'framer-motion';
import { Coffee, Mic, Users, Lightbulb, MessageCircle } from 'lucide-react';

const TYPE_STYLES: Record<
	string,
	{ icon: typeof Coffee; bg: string; text: string; border: string }
> = {
	Keynote: { icon: Mic, bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
	Workshop: { icon: Lightbulb, bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
	Panel: { icon: Users, bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
	Networking: { icon: Coffee, bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
	Break: { icon: Coffee, bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
	'Q&A': { icon: MessageCircle, bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
};

const SESSIONS = [
	{ time: '8:30 - 9:00', title: 'Check-in & cafe sáng', speaker: 'Networking', type: 'Networking' },
	{ time: '9:00 - 9:45', title: 'Khai mạc — Toàn cảnh thị trường Việt 2026', speaker: 'Nguyễn Hoàng Phương', type: 'Keynote' },
	{ time: '10:00 - 11:00', title: 'Tăng trưởng D2C trong kỷ nguyên AI', speaker: 'Trần Mai Anh', type: 'Keynote' },
	{ time: '11:00 - 12:00', title: 'Panel — Local brand vs. Global brand', speaker: 'Phạm Thuỳ Linh + 3 khách mời', type: 'Panel' },
	{ time: '12:00 - 13:30', title: 'Networking lunch', speaker: 'Cả hội nghị', type: 'Break' },
	{ time: '13:30 - 15:00', title: 'Workshop — Gọi vốn Series A', speaker: 'Lê Quốc Hùng', type: 'Workshop' },
	{ time: '15:15 - 16:15', title: 'AI agents thay đổi e-commerce thế nào', speaker: 'Đặng Văn Tài', type: 'Keynote' },
	{ time: '16:30 - 17:30', title: 'Q&A mở + bế mạc', speaker: 'Toàn bộ diễn giả', type: 'Q&A' },
];

export default function Agenda() {
	return (
		<section id='agenda' className='py-24 px-4 bg-white'>
			<div className='container mx-auto max-w-4xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center mb-12'
				>
					<span className='inline-block text-xs font-semibold text-rose-600 uppercase tracking-[0.15em] mb-3'>
						Lịch trình
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3'>
						Lịch trình chi tiết — 1 ngày
					</h2>
					<p className='text-slate-500'>Thứ 7, 15/03/2026 · GEM Center, TP.HCM</p>
				</motion.div>

				<div className='relative'>
					<div
						aria-hidden
						className='absolute left-[100px] sm:left-[140px] top-2 bottom-2 w-px bg-gradient-to-b from-rose-200 via-amber-200 to-violet-200'
					/>

					<div className='space-y-2'>
						{SESSIONS.map((s, i) => {
							const style = TYPE_STYLES[s.type] ?? TYPE_STYLES.Break;
							const Icon = style.icon;
							return (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: -16 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: i * 0.04 }}
									className='relative flex gap-4 sm:gap-5 group'
								>
									{/* Time column */}
									<div className='w-[80px] sm:w-[120px] flex-shrink-0 pt-3 text-right'>
										<p className='text-xs sm:text-sm font-semibold text-slate-700 tabular-nums'>
											{s.time.split(' - ')[0]}
										</p>
										<p className='text-[10px] sm:text-xs text-slate-400 tabular-nums'>
											{s.time.split(' - ')[1]}
										</p>
									</div>

									{/* Dot */}
									<div className='relative z-10 flex-shrink-0 w-10 h-10 mt-1.5'>
										<div
											className={`w-full h-full rounded-full ${style.bg} ${style.border} border-2 flex items-center justify-center group-hover:scale-110 transition-transform`}
										>
											<Icon className={`w-4 h-4 ${style.text}`} />
										</div>
									</div>

									{/* Content card */}
									<div className='flex-1 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:shadow-md hover:border-slate-300 transition-all mb-2'>
										<div className='flex items-start justify-between gap-3 mb-1'>
											<h3 className='font-heading font-bold text-slate-900 text-base leading-snug'>
												{s.title}
											</h3>
											<span
												className={`inline-flex flex-shrink-0 text-[10px] font-semibold ${style.bg} ${style.text} ${style.border} border px-2 py-0.5 rounded-full`}
											>
												{s.type}
											</span>
										</div>
										<p className='text-sm text-slate-500'>{s.speaker}</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
