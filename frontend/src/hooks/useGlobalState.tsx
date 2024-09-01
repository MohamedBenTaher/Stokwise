import { useState } from 'react';

export default function useGlobalState() {
	const [accessToken, setAccessToken] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({
		id: '',
		firstName: '',
		lastName: '',
		email: '',
	});
	const [isLoginReady, setIsLoginReady] = useState(true);
	const [isSignupReady, setIsSignupReady] = useState(true);
	const [isNavReady, setIsNavReady] = useState(true);
	const [isAccountReady, setIsAccountReady] = useState(true);
	const [isSourceReady, setIsSourceReady] = useState(true);

	const isReady =
		isSourceReady &&
		isLoginReady &&
		isSignupReady &&
		isNavReady &&
		isAccountReady;
	console.log('isReady:', isReady);
	console.log('isLoggedIn: inside', isLoggedIn);
	return {
		accessToken,
		setAccessToken,
		isLoggedIn,
		setIsLoggedIn,
		isReady,
		isSourceReady,
		setIsSourceReady,
		isLoginReady,
		setIsLoginReady,
		isSignupReady,
		setIsSignupReady,
		isNavReady,
		setIsNavReady,
		isAccountReady,
		setIsAccountReady,
		user,
		setUser,
	};
}
