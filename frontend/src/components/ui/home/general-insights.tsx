import React, { useState, useEffect } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MarketInsightsProps {
	isBullish: boolean;
	news: { [industry: string]: { articles: { title: string; url: string }[] } };
}

export default function GeneralInsights({
	isBullish,
	news,
}: MarketInsightsProps) {
	const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

	const gradientColor = isBullish ? 'from-green-700' : 'from-red-700';
	const textColor = isBullish ? 'text-green-700' : 'text-red-700';
	const status = isBullish ? 'bullish' : 'bearish';

	const articles = Object.values(news).flatMap((industry) => industry.articles);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentHeadlineIndex((prevIndex) => (prevIndex + 1) % articles.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [articles.length]);

	return (
		<Card className=" w-4/5 min-w-md mx-auto overflow-hidden relative">
			<div
				className={`absolute top-0 left-0 w-[90%] h-full rounded-full bg-gradient-radial bg-gradient-to-r ${gradientColor} to-transparent opacity-30 -translate-x-[25%] -translate-y-1 z-0`}
			/>
			<CardHeader className="relative z-10 mb-6">
				<CardTitle className="text-2xl font-bold flex flex-row items-center justify-start gap-x-3">
					<Badge
						variant="secondary"
						className="px-3 py-1 rounded-full inline-flex items-center space-x-1"
					>
						<span className="text-sm font-semibold">The markets are</span>
						<span className={`text-base font-bold ${textColor}`}>{status}</span>
					</Badge>
					<Badge
						variant="secondary"
						className="w-9 h-9 rounded-full inline-flex items-center justify-center"
					>
						{isBullish ? (
							<TrendingUp
								className={`h-6 w-6 ${textColor} font-bold`}
								strokeWidth={3}
							/>
						) : (
							<TrendingDown
								className={`h-6 w-6 ${textColor} font-bold`}
								strokeWidth={3}
							/>
						)}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent className="relative z-10">
				<CardDescription className="font-bold text-slate-200 opacity-70 text-sm mb-4">
					What's happening today in the market
				</CardDescription>
				<div className="relative h-20 overflow-hidden" aria-live="polite">
					<AnimatePresence initial={false}>
						<motion.div
							key={currentHeadlineIndex}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
							className="absolute w-full"
						>
							<p className="text-lg font-bold text-pretty">
								{articles[currentHeadlineIndex].title}
							</p>
						</motion.div>
					</AnimatePresence>
				</div>
			</CardContent>
		</Card>
	);
}
