import React, { useEffect } from 'react';
import api from '@/api';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/confirm/email')({
	component: () => {
		const { hash } = Route.useSearch();
		console.log('hash', hash);
		const navigate = useNavigate();
		const [loading, setLoading] = React.useState(true);
		const [emailComfirmed, setEmailConfirmed] = React.useState(false);
		const confirmAccuont = async (hash: string) => {
			api.auth.authControllerConfirmEmail({ hash }).then((res) => {
				return res.data;
			});
		};
		const cofirmEmailMutation = useMutation({
			mutationFn: () => confirmAccuont(hash),
			onSuccess: () => {
				setEmailConfirmed(true);
				setLoading(false);
				console.log('Email confirmed');
			},
			onError: (error) => {
				setEmailConfirmed(false);
				setLoading(false);
				console.log('error', error);
			},
		});
		useEffect(() => {
			cofirmEmailMutation.mutate();
		}, []);

		return (
			<div>
				{loading ? (
					<Icons.spinner />
				) : emailComfirmed ? (
					<div>
						<div className="flex justify-center items-center h-screen">
							<div className="text-center">
								<div className="text-2xl font-bold">Email confirmed</div>
								<Button
									onClick={() => {
										navigate({ to: '/auth/login' });
									}}
								>
									Go to login
								</Button>
							</div>
						</div>
					</div>
				) : (
					<div>
						<div className="flex justify-center items-center h-screen">
							<div className="text-center">
								<div className="text-2xl font-bold">Email not confirmed</div>
								<Button
									onClick={() => {
										navigate({ to: '/auth/login' });
									}}
								>
									Go to login
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	},
});
