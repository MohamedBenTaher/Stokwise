import React from 'react';
import api from '@/api';
import { useQuery } from '@tanstack/react-query';
import SectorPerformance from '@/components/ui/home/sector-performance';
import GeneralInsights from '@/components/ui/home/general-insights';

function Home() {
	const {
		data: marketNews,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['marketNews'],
		queryFn: async () => {
			const response = await api.marketNews.marketNewsControllerGetMarketNews();
			return response;
		},
	});
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error fetching market news</div>;
	}
	const marketNewsData = marketNews?.data?.marketNewsByIndustry;
	const isBullish = marketNewsData?.data?.overallAverageSentiment > 0.5;
	return (
		<div className="w-full h-full">
			<div className="flex w-full h-1/2 flex-row items-center justify-start gap-x-12">
				<GeneralInsights isBullish={isBullish} news={marketNewsData} />
				<SectorPerformance />
			</div>
		</div>
	);
}

export default Home;
