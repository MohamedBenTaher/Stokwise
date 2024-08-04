import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<div className="mx-auto h-12 w-12 text-primary" />
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Page Not Found
				</h1>
				<p className="mt-4 text-muted-foreground">
					The page you are looking for does not exist. Please check the URL or
					go back to the homepage.
				</p>
				<div className="mt-6">
					<Button
						className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						onClick={() => navigate('/')}
					>
						Go to Homepage
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
