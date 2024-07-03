import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/auth/login';
import Dashboard from './pages/dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import GlobalStateContext from './context/globalStateContext';
import useGlobalState from './hooks/useGlobalState';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from './components/theme/ThemeProvider';
import Navbar from './components/ui/navbar';

// Modify the router in App.tsx
function App() {
	const globalState = useGlobalState();

	const router = createBrowserRouter([
		{
			path: '/login',
			element: <LoginPage />,
		},
		{
			path: '/',
			element: <Navbar />, // Assuming Navbar correctly renders an Outlet for its children
			children: [
				{
					element: (
						<PrivateRoute>
							<Outlet />
						</PrivateRoute>
					),
					children: [
						{
							index: true,
							element: <Dashboard />,
						},
						// Add more nested routes here if necessary
					],
				},
			],
		},
	]);

	return (
		<div style={{ padding: 0 }}>
			<React.StrictMode>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<ErrorBoundary>
						<GlobalStateContext.Provider value={globalState}>
							<RouterProvider router={router} />
						</GlobalStateContext.Provider>
					</ErrorBoundary>
					<ReactQueryDevtools initialIsOpen={false} />
				</ThemeProvider>
			</React.StrictMode>
		</div>
	);
}
export default App;
