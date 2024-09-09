import React from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
function SectorPerformance() {
	return (
		<Card className="w-full min-w-md mx-auto overflow-hidden relative">
			<div className=" flex flex-col items-start justify-center">
				<CardHeader className="relative z-10 mb-6">
					<CardTitle className="text-2xl font-bold flex flex-row items-center justify-start gap-x-3">
						Sector Performance
					</CardTitle>
				</CardHeader>
				<CardContent className="relative z-10">
					<CardDescription className="text-sm text-muted-foreground">
						This section shows the performance of each sector in the stock
						market.
					</CardDescription>
				</CardContent>
			</div>
		</Card>
	);
}

export default SectorPerformance;
