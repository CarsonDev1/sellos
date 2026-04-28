'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

type HighlightVariant = 'blue' | 'yellow' | 'green' | 'violet' | 'rose' | 'light';

const BG: Record<HighlightVariant, string> = {
	blue: 'from-blue-300/60 to-sky-200/60',
	yellow: 'from-yellow-300/70 to-amber-200/70',
	green: 'from-green-300/60 to-emerald-200/60',
	violet: 'from-violet-300/60 to-purple-200/60',
	rose: 'from-rose-300/60 to-pink-200/60',
	light: 'from-white/30 to-white/15',
};

export function Highlight({
	children,
	className,
	variant = 'yellow',
	delay = 0.3,
}: {
	children: React.ReactNode;
	className?: string;
	variant?: HighlightVariant;
	delay?: number;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: '0px 0px -30px 0px' });

	return (
		<motion.span
			ref={ref}
			initial={{ backgroundSize: '0% 100%' }}
			animate={inView ? { backgroundSize: '100% 100%' } : {}}
			transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay }}
			style={{
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'left center',
			}}
			className={cn('relative inline bg-gradient-to-r rounded-md px-1 py-0.5 -mx-0.5', BG[variant], className)}
		>
			{children}
		</motion.span>
	);
}
