import { Link, createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Route = createFileRoute('/auth/login')({
	component: ({ className, ...props }: UserAuthFormProps) => {
		const [isLoading, setIsLoading] = React.useState<boolean>(false);

		async function onSubmit(event: React.SyntheticEvent) {
			event.preventDefault();
			setIsLoading(true);

			setTimeout(() => {
				setIsLoading(false);
			}, 3000);
		}

		return (
			<div className={cn('grid gap-6 h-screen', className)} {...props}>
				<div className="w-full lg:grid lg:min-h-full lg:grid-cols-2 xl:min-h-full">
					<div className="flex items-center justify-center py-12">
						<div className="mx-auto grid w-[350px] gap-6">
							<div className="grid gap-2 text-center">
								<h1 className="text-3xl font-bold">Login</h1>
								<p className="text-balance text-muted-foreground">
									Enter your email below to login to your account
								</p>
							</div>
							<div className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										<Link
											href="/forgot-password"
											className="ml-auto inline-block text-sm underline"
										>
											Forgot your password?
										</Link>
									</div>
									<Input id="password" type="password" required />
								</div>
								<Button type="submit" className="w-full">
									Login
								</Button>
								<Button variant="outline" className="w-full">
									Login with Google
								</Button>
							</div>
							<div className="mt-4 text-center text-sm">
								Don&apos;t have an account?{' '}
								<Link to="/auth/register" className="underline">
									Sign up
								</Link>
							</div>
						</div>
					</div>
					<div className="hidden bg-muted lg:block">
						<img
							src="../../src/assets/media/placeholder.svg"
							alt="Image"
							width="1920"
							height="1080"
							className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
				</div>
			</div>
		);
	},
});
