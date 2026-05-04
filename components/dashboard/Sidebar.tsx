'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
	LayoutDashboard,
	UserCircle2,
	Sparkles,
	FolderOpen,
	MessageCircle,
	Settings,
	Shield,
	X,
	Menu,
	type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
	href: string;
	label: string;
	icon: LucideIcon;
	badge?: string;
};

const NAV: NavItem[] = [
	{ href: '/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
	{ href: '/dashboard/thong-tin', label: 'Thông tin & Sản phẩm', icon: UserCircle2 },
	{ href: '/dashboard/chon-template', label: 'Tạo website mới', icon: Sparkles },
	{ href: '/dashboard/du-an', label: 'Dự án của tôi', icon: FolderOpen },
	{ href: '/dashboard/ai-chat', label: 'AI Chat', icon: MessageCircle, badge: 'Mới' },
	{ href: '/dashboard/settings', label: 'Cài đặt', icon: Settings },
];

const ADMIN: NavItem[] = [
	{ href: '/dashboard/admin', label: 'Quản trị Admin', icon: Shield },
];

interface Props {
	admin: boolean;
	userTrigger: React.ReactNode;
	userName: string;
	userEmail: string;
}

function isActive(pathname: string, href: string) {
	if (href === '/dashboard') return pathname === '/dashboard';
	return pathname === href || pathname.startsWith(href + '/');
}

function NavLink({
	href,
	label,
	icon: Icon,
	badge,
	active,
	variant,
	onNavigate,
}: NavItem & {
	active: boolean;
	variant?: 'admin';
	onNavigate?: () => void;
}) {
	const isAdmin = variant === 'admin';
	return (
		<Link
			href={href}
			onClick={onNavigate}
			aria-current={active ? 'page' : undefined}
			className={cn(
				'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
				active
					? isAdmin
						? 'bg-orange-50 text-orange-700 shadow-sm border border-orange-200/60'
						: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20'
					: isAdmin
						? 'text-orange-600/80 hover:text-orange-700 hover:bg-orange-50/60'
						: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70',
			)}
		>
			{/* Left bar accent for active non-admin */}
			{active && !isAdmin && (
				<span
					aria-hidden
					className='absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full'
				/>
			)}

			<Icon
				className={cn(
					'w-[18px] h-[18px] flex-shrink-0 transition-colors',
					active
						? isAdmin
							? 'text-orange-600'
							: 'text-white'
						: isAdmin
							? 'text-orange-400 group-hover:text-orange-600'
							: 'text-slate-400 group-hover:text-blue-600',
				)}
				strokeWidth={active ? 2.5 : 2}
			/>
			<span className='flex-1 truncate'>{label}</span>
			{badge && (
				<span
					className={cn(
						'inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none',
						active
							? 'bg-white/20 text-white'
							: 'bg-blue-100 text-blue-700',
					)}
				>
					{badge}
				</span>
			)}
		</Link>
	);
}

export default function DashboardSidebar({
	admin,
	userTrigger,
	userName,
	userEmail,
}: Props) {
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);

	const sidebar = (onNavigate?: () => void) => (
		<>
			{/* Logo */}
			<div className='h-16 flex items-center px-6 border-b border-slate-100 flex-shrink-0'>
				<Link
					href='/'
					onClick={onNavigate}
					className='flex items-center gap-2.5 group'
				>
					<span className='inline-flex w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 items-center justify-center shadow-md shadow-blue-600/25'>
						<Sparkles className='w-4 h-4 text-white' />
					</span>
					<div className='flex flex-col leading-none'>
						<span className='font-heading font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors'>
							SellOS
						</span>
						<span className='text-[10px] text-slate-400 font-medium mt-0.5'>
							Nền tảng bán hàng
						</span>
					</div>
				</Link>
			</div>

			{/* Nav */}
			<nav className='flex-1 px-4 py-5 space-y-1 overflow-y-auto'>
				<p className='text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-3 mb-2'>
					Chính
				</p>
				{NAV.map((item) => (
					<NavLink
						key={item.href}
						{...item}
						active={isActive(pathname, item.href)}
						onNavigate={onNavigate}
					/>
				))}

				{admin && (
					<>
						<div className='pt-5 pb-1 px-3'>
							<p className='text-[10px] font-bold text-orange-600/70 uppercase tracking-[0.2em]'>
								Quản trị
							</p>
						</div>
						{ADMIN.map((item) => (
							<NavLink
								key={item.href}
								{...item}
								variant='admin'
								active={isActive(pathname, item.href)}
								onNavigate={onNavigate}
							/>
						))}
					</>
				)}

				{/* Help card */}
				<div className='mt-6 mx-1 rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 border border-blue-100 p-4'>
					<div className='flex items-center gap-2 mb-2'>
						<span className='inline-flex w-7 h-7 rounded-lg bg-white shadow-sm items-center justify-center'>
							<MessageCircle className='w-3.5 h-3.5 text-blue-600' />
						</span>
						<p className='text-xs font-bold text-slate-900'>Cần hỗ trợ?</p>
					</div>
					<p className='text-[11px] text-slate-600 leading-relaxed mb-3'>
						Chat với AI để được tư vấn từng bước.
					</p>
					<Link
						href='/dashboard/ai-chat'
						onClick={onNavigate}
						className='inline-flex items-center text-[11px] font-bold text-blue-700 hover:text-blue-800'
					>
						Mở AI Chat →
					</Link>
				</div>
			</nav>

			{/* User box */}
			<div className='p-4 border-t border-slate-100 flex-shrink-0'>
				<div className='flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors'>
					<div className='flex-shrink-0'>{userTrigger}</div>
					<div className='flex-1 min-w-0 leading-tight'>
						<p className='text-sm font-semibold text-slate-900 truncate'>{userName}</p>
						<p className='text-[11px] text-slate-500 truncate'>{userEmail}</p>
					</div>
					{admin && (
						<span className='inline-flex items-center gap-1 text-[9px] font-bold text-orange-700 bg-orange-100 border border-orange-200 px-1.5 py-0.5 rounded-full uppercase tracking-wider'>
							<Shield className='w-2.5 h-2.5' />
							Admin
						</span>
					)}
				</div>
			</div>
		</>
	);

	return (
		<>
			{/* Desktop sidebar */}
			<aside className='hidden md:flex w-64 flex-col bg-white border-r border-slate-200 fixed inset-y-0 left-0 z-40'>
				{sidebar()}
			</aside>

			{/* Mobile trigger - always visible on small screens, lives in topbar */}
			<button
				type='button'
				onClick={() => setMobileOpen(true)}
				className='md:hidden fixed top-3 left-3 z-30 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-slate-900'
				aria-label='Mở menu'
			>
				<Menu className='w-5 h-5' />
			</button>

			{/* Mobile drawer */}
			{mobileOpen && (
				<div className='md:hidden fixed inset-0 z-50'>
					<div
						className='absolute inset-0 bg-slate-900/60 backdrop-blur-sm'
						onClick={() => setMobileOpen(false)}
					/>
					<div className='absolute inset-y-0 left-0 w-72 bg-white flex flex-col shadow-2xl animate-in slide-in-from-left duration-200'>
						<button
							onClick={() => setMobileOpen(false)}
							className='absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center'
							aria-label='Đóng'
						>
							<X className='w-4 h-4 text-slate-600' />
						</button>
						{sidebar(() => setMobileOpen(false))}
					</div>
				</div>
			)}
		</>
	);
}
