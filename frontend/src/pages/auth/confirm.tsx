import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircleCheckIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import api from '@/api';
import { Button } from '@/components/ui/button';
import GlobalStateContext from '@/context/globalStateContext';

function Confirm() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const hash = queryParams.get('hash');
	const navigate = useNavigate();
	const globalState = useContext(GlobalStateContext);

	const { mutate, isLoading, isSuccess } = useMutation({
		mutationFn: async () => {
			if (!hash?.length) {
				throw new Error('Hash not found');
			}
			await api.auth.authControllerConfirmEmail({ hash });
		},
		onError: (error) => {
			console.error('Confirm email error:', error);
		},
		onSuccess: (response) => {
			globalState.setIsLoggedIn(true);
			globalState.setAccessToken(response.tokens.token);
		},
	});

	useEffect(() => {
		mutate();
	}, [mutate]);

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center ">
			<div className="w-[40%] h-full flex flex-col items-center justify-center  gap-y-6 p-3 ">
				<CircleCheckIcon size={64} className="mx-auto text-green-500" />
				<div className="text-3xl font-bold text-center">Email Confirmed</div>
				<div className="text-lg text-pretty text-left">
					Thank you for confirming your email address. You can now access all
					the features of our platform.
				</div>
				<Button
					type="submit"
					className="w-full"
					onClick={() => {
						navigate('/');
					}}
				>
					Home
				</Button>
			</div>
		</div>
	);
}

export default Confirm;
