import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/forgot')({
	component: () => {
		const queryClient = useQueryClient();
		const [isLoading, setIsLoading] = React.useState<boolean>(false);
		return (
			<div>
				Hello /auth/forgot!
				<div className="grid gap-6 h-screen">
					<div className="w-full lg:grid lg:min-h-full lg:grid-cols-2 xl:min-h-full">
						<div className="flex items-center justify-center py-12">
							<div className="mx-auto grid w-[350px] gap-6">
								<div className="grid gap-2 text-center">
									<h1 className="text-3xl font-bold">Forgot Password</h1>
									<p className="text-balance text-muted-foreground">
										Enter your email below to reset your password
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
									<Button type="submit" className="w-full">
										Reset Password
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
});
