import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import * as jwt from 'jwt-decode';
import { useLocation } from '@tanstack/react-router';

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const token = Cookies.get('token');
		console.log('token', token);
		if (!token) {
			setIsAuthenticated(false);
			console.log('token not found');
		} else {
			try {
				const decodedToken = jwt.jwtDecode(token);
				console.log('decodedToken', decodedToken);
				const currentTime = Date.now() / 1000;
				if (decodedToken?.exp ?? 0 < currentTime) {
					setIsAuthenticated(false);
				} else {
					setIsAuthenticated(true);
				}
			} catch (err) {
				setIsAuthenticated(false);
			}
		}
	}, [location]);

	return { isAuthenticated: isAuthenticated };
};
