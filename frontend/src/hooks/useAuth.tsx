import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import * as jwt from 'jwt-decode';

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	useEffect(() => {
		const token = Cookies.get('token');
		if (!token) {
			setIsAuthenticated(false);
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
	}, []);

	return { isAuthenticated: isAuthenticated };
};
