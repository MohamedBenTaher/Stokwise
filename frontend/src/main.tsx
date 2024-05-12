// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Router, RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './components/theme/ThemeProvider.tsx';
import { useAuth } from './hooks/useAuth.tsx';

const queryClient = new QueryClient();

function InnerApp() {
	const authentication = useAuth();
	const router = createRouter({
		routeTree,
		context: {
			queryClient,
			authentication,
		},
		defaultPreload: 'intent',
		defaultPreloadStaleTime: 0,
	});

	return <RouterProvider router={router} />;
}

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof Router;
	}
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<QueryClientProvider client={queryClient}>
				<InnerApp />
				<App />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
