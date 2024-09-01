import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Badge } from './badge';

interface MarketInsightsProps {
	isBullish: boolean;
}

export default function GeneralInsights({ isBullish }: MarketInsightsProps) {
	const gradientColor = isBullish ? 'from-green-700' : 'from-red-700';
	const textColor = isBullish ? 'text-green-700' : 'text-red-700';
	const status = isBullish ? 'bullish' : 'bearish';

	return (
		<Card className={`w-full max-w-md mx-auto overflow-hidden relative `}>
			<div
				className={`absolute top-0 left-0 w-[90%] h-full rounded-full bg-gradient-radial bg-gradient-to-r ${gradientColor} to-transparent opacity-30 -translate-x-[25%] -translate-y-1 z-0`}
			/>
			<CardHeader className="relative z-10 mb-12">
				<CardTitle className="text-2xl font-bold flex flex-row items-center justify-start gap-x-3">
					<Badge
						variant="secondary"
						className="px-3 py-1 rounded-full inline-flex items-center space-x-1"
					>
						<span className="text-sm font-semibold">The markets are</span>
						<span className={` text-base font-bold ${textColor}`}>
							{status}
						</span>
					</Badge>
					{isBullish ? (
						<Badge
							variant="secondary"
							className="w-10 h-10 rounded-full inline-flex items-center justify-center"
						>
							<TrendingUp className={`h-6 w-6 ${textColor}`} />
						</Badge>
					) : (
						<Badge
							variant="secondary"
							className="w-10 h-10 rounded-full inline-flex items-center justify-center"
						>
							<TrendingDown className={`h-6 w-6 ${textColor}`} />
						</Badge>
					)}
				</CardTitle>
			</CardHeader>
			<CardContent className="relative z-10">
				<CardDescription className="font-bold text-slate-200 opacity-70 text-sm">
					what's happening today in the market
				</CardDescription>
				<p className="text-lg font-bold text-pretty">
					{isBullish
						? 'The market is showing strong positive momentum. Investors are optimistic about economic growth and corporate earnings.'
						: 'The market is experiencing a downturn. Investors are cautious due to economic uncertainties and potential risks.'}
				</p>
			</CardContent>
		</Card>
	);
}
