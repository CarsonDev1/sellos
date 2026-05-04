import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import {
	LayoutGrid,
	MessageCircle,
	ShoppingBag,
	Wallet,
	Sparkles,
	Settings,
	ArrowRight,
	Check,
	Circle,
	UserCircle2,
	FolderOpen,
} from 'lucide-react';
import PageHeader from '@/components/dashboard/PageHeader';

export const metadata = {
	title: 'Dashboard — SellOS',
};

const STATS = [
	{
		label: 'Template đã dùng',
		value: '0',
		icon: LayoutGrid,
		bg: 'from-blue-500 to-indigo-600',
		soft: 'bg-blue-50 text-blue-700',
	},
	{
		label: 'Cuộc trò chuyện AI',
		value: '0',
		icon: MessageCircle,
		bg: 'from-violet-500 to-fuchsia-600',
		soft: 'bg-violet-50 text-violet-700',
	},
	{
		label: 'Đơn hàng hôm nay',
		value: '0',
		icon: ShoppingBag,
		bg: 'from-rose-500 to-pink-600',
		soft: 'bg-rose-50 text-rose-700',
	},
	{
		label: 'Doanh thu tháng',
		value: '0₫',
		icon: Wallet,
		bg: 'from-emerald-500 to-teal-600',
		soft: 'bg-emerald-50 text-emerald-700',
	},
];

const QUICK_ACTIONS = [
	{
		title: 'Điền thông tin & sản phẩm',
		desc: 'Nhập tên, mô tả, sản phẩm — AI dùng để dựng web cho bạn.',
		href: '/dashboard/thong-tin',
		icon: UserCircle2,
		color: 'from-blue-500 to-indigo-600',
		cta: 'Điền thông tin',
	},
	{
		title: 'Tạo website mới',
		desc: 'Chọn mẫu — AI dựng nội dung và đưa lên mạng cho bạn.',
		href: '/dashboard/chon-template',
		icon: Sparkles,
		color: 'from-violet-500 to-fuchsia-600',
		cta: 'Tạo ngay',
	},
	{
		title: 'Xem dự án của tôi',
		desc: 'Quản lý các website đã tạo, xem đơn hàng và chỉnh sửa.',
		href: '/dashboard/du-an',
		icon: FolderOpen,
		color: 'from-amber-500 to-orange-600',
		cta: 'Xem danh sách',
	},
];

const CHECKLIST = [
	{ done: true, label: 'Tạo tài khoản SellOS', href: null },
	{ done: false, label: 'Điền thông tin & sản phẩm', href: '/dashboard/thong-tin' },
	{ done: false, label: 'Chọn mẫu website phù hợp', href: '/dashboard/chon-template' },
	{ done: false, label: 'Đưa website lên mạng', href: '/dashboard/du-an' },
	{ done: false, label: 'Chat với AI tối ưu chiến lược', href: '/dashboard/ai-chat' },
];

export default async function DashboardPage() {
	const user = await currentUser();
	const firstName = user?.firstName ?? 'bạn';
	const completedSteps = CHECKLIST.filter((c) => c.done).length;
	const progress = Math.round((completedSteps / CHECKLIST.length) * 100);

	return (
		<div className='space-y-8'>
			<PageHeader
				title={`Chào ${firstName} 👋`}
				description='Đây là tổng quan tài khoản SellOS của bạn. Bắt đầu từ những bước nhỏ — hệ thống bán hàng tự động đang chờ bạn.'
				actions={
					<Link
						href='/dashboard/chon-template'
						className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 h-10 rounded-xl shadow-sm shadow-blue-600/20 transition-colors'
					>
						<Sparkles className='w-4 h-4' />
						Tạo website mới
					</Link>
				}
			/>

			{/* Stats */}
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
				{STATS.map(({ label, value, icon: Icon, bg }) => (
					<div
						key={label}
						className='group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all'
					>
						<div className='flex items-start justify-between mb-3'>
							<div
								className={`w-11 h-11 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center shadow-sm`}
							>
								<Icon className='w-5 h-5 text-white' />
							</div>
							<span className='inline-flex items-center text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full'>
								Hôm nay
							</span>
						</div>
						<p className='font-heading font-bold text-2xl text-slate-900 tracking-tight'>
							{value}
						</p>
						<p className='text-sm text-slate-500 mt-0.5'>{label}</p>
					</div>
				))}
			</div>

			{/* Onboarding progress */}
			<div className='relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-blue-600/20'>
				<div
					aria-hidden
					className='absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none'
				/>
				<div
					aria-hidden
					className='absolute inset-0 opacity-[0.07]'
					style={{
						backgroundImage:
							'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
						backgroundSize: '40px 40px',
					}}
				/>

				<div className='relative flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between'>
					<div className='lg:max-w-md'>
						<div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-xs font-semibold mb-4'>
							<Sparkles className='w-3 h-3' />
							Thiết lập tài khoản
						</div>
						<h2 className='font-heading font-bold text-2xl sm:text-3xl mb-2 tracking-tight'>
							Hoàn thành {completedSteps}/{CHECKLIST.length} bước để bắt đầu
						</h2>
						<p className='text-blue-100/80 text-sm leading-relaxed'>
							Mỗi bước đều có hướng dẫn cụ thể. Bạn có thể tạm dừng và quay lại bất kỳ lúc nào.
						</p>

						{/* Progress bar */}
						<div className='mt-5'>
							<div className='flex items-center justify-between text-xs mb-2'>
								<span className='text-blue-100'>Tiến độ</span>
								<span className='font-bold'>{progress}%</span>
							</div>
							<div className='h-2 bg-white/15 rounded-full overflow-hidden'>
								<div
									className='h-full bg-gradient-to-r from-amber-300 to-rose-400 rounded-full transition-all duration-500'
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>
					</div>

					<div className='flex-1 lg:max-w-md space-y-2'>
						{CHECKLIST.map((step, i) => {
							const content = (
								<div
									className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
										step.done
											? 'bg-white/5'
											: 'bg-white/10 hover:bg-white/15 border border-white/15'
									}`}
								>
									<span
										className={`inline-flex w-6 h-6 rounded-full items-center justify-center flex-shrink-0 ${
											step.done
												? 'bg-gradient-to-br from-emerald-400 to-teal-500'
												: 'bg-white/10 border border-white/30'
										}`}
									>
										{step.done ? (
											<Check className='w-3.5 h-3.5 text-white' strokeWidth={3} />
										) : (
											<Circle className='w-3 h-3 text-white/50' />
										)}
									</span>
									<span
										className={`text-sm flex-1 ${
											step.done
												? 'line-through text-blue-200/60'
												: 'text-white font-medium'
										}`}
									>
										{step.label}
									</span>
									{!step.done && step.href && (
										<ArrowRight className='w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all' />
									)}
								</div>
							);
							return step.done || !step.href ? (
								<div key={i}>{content}</div>
							) : (
								<Link key={i} href={step.href}>
									{content}
								</Link>
							);
						})}
					</div>
				</div>
			</div>

			{/* Quick actions */}
			<div>
				<div className='flex items-end justify-between mb-4'>
					<div>
						<h2 className='font-heading font-bold text-lg text-slate-900'>
							Bắt đầu nhanh
						</h2>
						<p className='text-sm text-slate-500 mt-0.5'>
							3 việc quan trọng nhất để có website đầu tiên
						</p>
					</div>
					<Link
						href='/dashboard/settings'
						className='hidden sm:inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 font-medium'
					>
						<Settings className='w-4 h-4' />
						Cài đặt
					</Link>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
					{QUICK_ACTIONS.map(({ title, desc, href, icon: Icon, color, cta }) => (
						<Link
							key={title}
							href={href}
							className='group relative bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all hover:-translate-y-0.5 flex flex-col'
						>
							<div
								className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md mb-4`}
							>
								<Icon className='w-5 h-5 text-white' />
							</div>
							<h3 className='font-heading font-bold text-slate-900 text-base mb-1.5 leading-snug'>
								{title}
							</h3>
							<p className='text-sm text-slate-500 leading-relaxed mb-5 flex-1'>
								{desc}
							</p>
							<span className='inline-flex items-center gap-1 text-sm text-blue-600 font-semibold group-hover:gap-2 transition-all'>
								{cta}
								<ArrowRight className='w-4 h-4' />
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
