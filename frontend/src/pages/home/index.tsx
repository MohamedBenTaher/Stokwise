import api from '@/api';
import GeneralInsights from '@/components/ui/general-insights';
import { Icons } from '@/components/ui/icons';
import { Sidebar } from '@/components/ui/sidebar';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

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
	const marketNewsData = marketNews?.data.ar
	return (
		<div className="w-full h-full">
			<div className="flex w-full h-1/2 flex-row items-center  justify-start">
				<GeneralInsights isBullish={true} />
			</div>
		</div>
	);
}

export default Home;
