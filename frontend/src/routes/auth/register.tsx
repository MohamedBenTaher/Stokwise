import { Link, createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { registerFormSchema } from '@/utils/validation/auth';
import { ZodObject, ZodString, ZodTypeAny } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Route = createFileRoute('/auth/register')({
	component: ({ className, ...props }: UserAuthFormProps) => {
		const [isLoading, setIsLoading] = React.useState<boolean>(false);
		const form = useForm<z.infer<typeof registerFormSchema>>({
			resolver: zodResolver(registerFormSchema),
			defaultValues: {
				firstname: '',
				lastname: '',
				email: '',
				password: '',
				confimPassowrd: '',
			},
		});
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
								<h1 className="text-3xl font-bold">Register</h1>
								<p className="text-balance text-muted-foreground">
									Enter your details below to create an account
								</p>
							</div>
							<div className="grid gap-4">
								<div className="grid grid-cols-2 gap-2">
									<div className="grid gap-2">
										<Label htmlFor="email">First name</Label>
										<Input
											id="email"
											type="email"
											placeholder="m@example.com"
											required
										/>
									</div>

									<div className="grid gap-2">
										<Label htmlFor="email">Last name</Label>
										<Input
											id="email"
											type="email"
											placeholder="m@example.com"
											required
										/>
									</div>
								</div>
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
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Confirm password</Label>
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
									Register
								</Button>
								<Button variant="outline" className="w-full">
									Register with Google
								</Button>
							</div>
							<div className="mt-4 text-center text-sm">
								Don&apos;t have an account?{' '}
								<Link to="/auth/login" className="underline">
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
