import React from 'react';
import { Button } from '@/components/ui/button';

interface State {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// You can also log the error to an error reporting service
		console.error('Uncaught error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// Render the custom fallback UI
			return (
				<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-md text-center">
						<div className="mx-auto h-12 w-12 text-primary" />
						<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							Oops, something went wrong!
						</h1>
						<p className="mt-4 text-muted-foreground">
							An unexpected error has occurred. Please try again later or
							contact support if the issue persists.
						</p>
						<div className="mt-6">
							<Button
								className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
								onClick={() => window.location.reload()}
							>
								Retry
							</Button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
