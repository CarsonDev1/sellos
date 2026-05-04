import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
	label: string;
	href?: string;
}

interface Props {
	title: string;
	description?: React.ReactNode;
	crumbs?: Crumb[];
	actions?: React.ReactNode;
}

/**
 * Standard page header for dashboard sections.
 * - Breadcrumb (optional)
 * - Title + description
 * - Action slot for buttons
 */
export default function PageHeader({ title, description, crumbs, actions }: Props) {
	return (
		<div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8'>
			<div className='min-w-0 flex-1'>
				{crumbs && crumbs.length > 0 && (
					<nav
						aria-label='Breadcrumb'
						className='flex items-center gap-1.5 text-sm text-slate-500 mb-3'
					>
						{crumbs.map((c, i) => {
							const isLast = i === crumbs.length - 1;
							return (
								<span key={i} className='inline-flex items-center gap-1.5'>
									{c.href && !isLast ? (
										<Link
											href={c.href}
											className='hover:text-slate-900 transition-colors'
										>
											{c.label}
										</Link>
									) : (
										<span className={isLast ? 'text-slate-700 font-medium' : ''}>
											{c.label}
										</span>
									)}
									{!isLast && <ChevronRight className='w-3.5 h-3.5 text-slate-300' />}
								</span>
							);
						})}
					</nav>
				)}
				<h1 className='font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight'>
					{title}
				</h1>
				{description && (
					<p className='text-slate-500 mt-1.5 text-sm sm:text-base max-w-2xl'>
						{description}
					</p>
				)}
			</div>
			{actions && <div className='flex items-center gap-2 flex-wrap'>{actions}</div>}
		</div>
	);
}
